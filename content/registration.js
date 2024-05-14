const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const port = 3000;

// Middleware für das Parsen von Anfragekörpern
app.use(bodyParser.urlencoded({ extended: true }));

// Konfiguration für die Verbindung zur Azure SQL-Datenbank
const config = {
    user: 'sqladmin',
    password: 'trading123.',
    server: 'tradingtrainerserver.database.windows.net',
    database: 'TradingTrainerDatabase',
};

// Route für das Formular
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/registrationpage.html');
});

// Route für das Speichern von Benutzerdaten
// Route für das Speichern von Benutzerdaten
// Route für das Speichern von Benutzerdaten
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    console.log('Empfangene Daten:', name, email); // Ausgabe der empfangenen Daten in der Konsole

    console.log('Empfangene Daten:', name, email); // Ausgabe der empfangenen Daten in der Konsole

    // Verbindung zur Datenbank herstellen
    sql.connect(config)
        .then(pool => {
            // Abfrage ausführen, um Daten einzufügen
            return pool.request()
                .input('name', sql.NVarChar, name)
                .input('email', sql.NVarChar, email)
                .query('INSERT INTO Users (Name, Email) VALUES (@name, @email)');
        })
        .then(result => {
            console.log('Benutzerdaten erfolgreich gespeichert');

            // Abfrage ausführen, um alle Einträge aus der Datenbank abzurufen
            return sql.query`SELECT * FROM Users`;
        })
        .then(result => {
            // Ausgabe aller Einträge in der Konsole
            console.log('Alle Einträge aus der Datenbank:', result.recordset);

            // Bestätigungsantwort an den Client senden
            res.send('Benutzerdaten erfolgreich gespeichert');
        })
        .catch(err => {
            console.error('Fehler beim Speichern der Benutzerdaten:', err);
            res.status(500).send('Fehler beim Speichern der Benutzerdaten');
        });
});

// Server starten
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
