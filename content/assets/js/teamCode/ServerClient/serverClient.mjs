import {User} from "../model.mjs";

const userUrl = 'http://localhost:3000/users';
const stockUrl = 'http://localhost:3000/stocks';

export function updateUser(user) {
    fetch(`${userUrl}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

export function getUser(email, callback)
{
    fetch(`${userUrl}?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            const user = users[0];
            if (!user) {
                console.log('Benutzer existiert nicht');
                return;
            }

            let us =  new User(user.id, user.email, user.password, user.name, user.money, user.stocks);

            callback(null, us);

        })
        .catch(error => {callback(error, null);});
}


export async function getStockName(symbol)
{
    fetch(`${stockUrl}?symbol=${symbol}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data[0].name;
        })
        .catch(error => {return null});
}