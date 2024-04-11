document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars (das Absenden)

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;

        console.log('Username:', username);
        console.log('Password:', password);

        const loggedIn = await checkUserCredentials(username,email, password);
        if (loggedIn) {
            console.log('Anmeldung erfolgreich');
        } else {
            console.log('Anmeldung fehlgeschlagen');
        }
    });
});
async function checkUserCredentials(username, email, password) {
    try {
        const response = await fetch(`http://localhost:3000/users?name=${username}&email=${email}&password=${password}`);
        const users = await response.json();

        if (users.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Fehler bei der Überprüfung der Benutzerdaten:', error);
        return false;
    }
}

