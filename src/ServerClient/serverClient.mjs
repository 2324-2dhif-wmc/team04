import {Stock, User} from "../model.mjs";

const serverUrl = 'http://localhost:3000/users';

export function addStock(user) {
    fetch(`${serverUrl}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}
