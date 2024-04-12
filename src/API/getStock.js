const finnhub = require('finnhub');
const Stock = require('./Stock');

function getQuote(symbol, callback) {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cnk1a91r01qvd1hlrv30cnk1a91r01qvd1hlrv3g";
    const finnhubClient = new finnhub.DefaultApi();

    // Abrufen der Aktiendaten mithilfe der quote-Funktion von Finnhub
    finnhubClient.quote(symbol, (error, data, response) => {
        if (error) {
            callback(error, null);
        } else {
            const stock = new Stock (
                symbol,
                data.c, // Aktueller Preis
                data.h, // Höchster Preis des Tages
                data.l, // Niedrigster Preis des Tages
                data.o, // Eröffnungspreis
                data.pc // Vorheriger Schlusskurs
            );
            callback(null, stock);
        }
    });
}

getQuote('AAPL', (error, stock) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Received stock:', stock);
        // Hier können Sie das erhaltene Stock-Objekt verwenden
    }
});