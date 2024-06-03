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

export async function getUser(email)
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
            let user = users[0];
            return new User(user.id, user.email, user.password, user.name, user.money, user.stocks);
        })
        .catch(error => {return null;});
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