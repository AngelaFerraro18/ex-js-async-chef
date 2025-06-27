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
    const ricetta = await fetchJson(`https://dummyjson.com/recipes/${id}`);

    const userId = ricetta.userId;

    const chef = await fetchJson(`https://dummyjson.com/users/${userId}`);

    return chef.birthDate;
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