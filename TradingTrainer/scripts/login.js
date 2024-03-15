

let createButton = document.getElementById('create');
function clickCreate() {
    let username = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repeatPassword = document.getElementById('passwordRepeat').value;
    if(password !== repeatPassword) {
        alert('Passwords do not match');
        return;
    }
    console.log(password);
    console.log(repeatPassword)
    console.log(username);
    createUser(username, password);
}

function createUser(username, password) {
    const express = require('express');
    const fs = require('fs');
    const bodyParser = require('body-parser');

    const app = express();
    const port = 3000;

    app.use(bodyParser.json());

    app.post('/daten', (req, res) => {
        const daten = req.body;
        fs.writeFile('daten.json', JSON.stringify(daten), (err) => {
            if (err) {
                console.error('Fehler beim Schreiben in die Datei:', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                console.log('Daten erfolgreich in die Datei geschrieben:', daten);
                res.status(200).send('Daten erfolgreich gespeichert');
            }
        });
    });

    app.listen(port, () => {
        console.log(`Server läuft auf http://localhost:${port}`);
    });

}
createButton.addEventListener('click', clickCreate);