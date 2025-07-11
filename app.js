/* Scrivi la funzione getChefBirthday(id), che deve:
Essere asincrona (async).
Utilizzare await per chiamare le API.
Restituire una Promise con la data di nascita dello chef.
Gestire gli errori con try/catch */

async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
}

async function getChefBirthday(id) {

    let ricetta;

    try {
        ricetta = await fetchJson(`https://dummyjson.com/recipes/${id}`);
    } catch (err) {
        throw new Error(`Non posso raggiungere la ricetta con id: ${id}`)
    }

    if (ricetta.message) {
        throw new Error(ricetta.message)
    }
    const userId = ricetta.userId;

    let chef;

    try {
        chef = await fetchJson(`https://dummyjson.com/users/${userId}`);
    } catch (err) {
        throw new Error(`Non posso raggiungere lo chef con l'id: ${userId}`)
    }

    if (chef.message) {
        throw new Error(chef.message)
    }

    const dataCompleanno = chef.birthDate;

    const dataFormattata = dayjs(dataCompleanno).format('DD/MM/YYYY');

    return dataFormattata;
}


(async () => {
    try {
        const birthday = await getChefBirthday(1);
        console.log("Il compleanno dello chef è il", birthday)
    } catch (error) {
        console.error(error)
    }
})();

// getChefBirthday(1)
//     .then(birthday => console.log("Il compleanno dello chef è il", birthday))
//     .catch(err => console.error(err))