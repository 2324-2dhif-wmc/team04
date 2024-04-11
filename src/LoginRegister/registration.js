document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Daten aus den Eingabefeldern lesen
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);

        if(!checkIfUserExists(email)) {
            const newUser = {
                name: username,
                email: email,
                password: password,
            };
            createUser(newUser);
        }
    });
});

function checkIfUserExists(email) {
    fetch(`http://localhost:3000/users?email=${email}`)
        .then(response => response.json())
        .then(users => {
            if(users.length > 0) {
                alert('User with this email already exists');
                return true;
            }
        });
    return false;
}

function createUser(newUser) {
    return fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
        .then(response => response.json())
        .then(user => user);
}