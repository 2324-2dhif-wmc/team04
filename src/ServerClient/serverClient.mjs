import {Stock, User} from "../model.mjs";

const serverUrl = 'http://localhost:3000/users';

export function updateUser(user) {
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

export function getUser(email, callback)
{
    fetch(`${serverUrl}?email=${email}`, {
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

            let us =  new User(user.id, user.email, user.password);

            callback(user, null);

        })
        .catch(error => {callback(null, error);});
}
