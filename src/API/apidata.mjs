import { restClient } from '@polygon.io/client-js';
import {Stock} from "./stock.mjs";
const rest = restClient('aEMjzbpWJ5Z0qeGSofwG4_LDJoM9LN_5');
import finnhub from 'finnhub';



export function getThreeMonthRange(symbol, from, to) {
    const cValues = [];
    rest.stocks.aggregates(symbol, 1, "day", from, to).then((data) => {
        for(let i = 0; i < data.results.length; i++) {
            cValues.push(data.results[i].c);
        }
    });
    return [cValues, from, to]
}

export function generateDateRangeArray(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dateArray.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}

export function getQuote(symbol, callback) {

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cnk1a91r01qvd1hlrv30cnk1a91r01qvd1hlrv3g";
    const finnhubClient = new finnhub.DefaultApi();


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


const startDate = "2023-01-01";
const endDate = "2023-03-01";
