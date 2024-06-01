import {News, Stock} from "../model.mjs";
/*

import {restClient} from '@polygon.io/client-js';

import finnhub from '../../../../../node_modules/finnhub/dist/index.js';

const rest = restClient('aEMjzbpWJ5Z0qeGSofwG4_LDJoM9LN_5');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cnk1a91r01qvd1hlrv30cnk1a91r01qvd1hlrv3g";
const finnhubClient = new finnhub.DefaultApi();
*/

function getDateString(date)
{
    let month = ("00" + (date.getMonth() + 1)).slice(-2);
    let day = ("00" + date.getDate()).slice(-2);
    return `${date.getFullYear()}-${month}-${day}`;
}

export async function getStockNews(symbol)
{
    let beginning = new Date();
    beginning.setDate(beginning.getDate() - 1);

    const apiKey = "cnk1a91r01qvd1hlrv30cnk1a91r01qvd1hlrv3g";

    const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${getDateString(beginning).toString()}&to=${getDateString(new Date())}&token=${apiKey}`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        return null;
    }
}



export function getThreeMonthRange(symbol, callback) {
    let cValues = [];
    rest.stocks.aggregates(symbol, 1, "day", "2023-01-01", "2023-03-01").then((data) => {
        for(let i = 0; i < data.results.length; i++) {
            cValues.push(data.results[i].c);
        }
        callback(null, cValues);
    });
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
    const key = "cnk1a91r01qvd1hlrv30cnk1a91r01qvd1hlrv3g";

    /*
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let quote = new Stock(symbol, data.c, data.h, data.l, data.o, data.t);

            callback(null, quote);
        })
        .catch(error => {callback(error, null);});
        */



    finnhubClient.quote('AAPL', (error, data, response) => {
        if (error) {
            callback(error, null);
        } else {
            const stock = new Stock (
                symbol,
                data.c, // Aktueller Preis
                data.h, // Höchster Preis des Tages
                data.l, // Niedrigster Preis des Tages
                data.o, // Eröffnungspreis
                data.t // time
            );
            console.log(data);
            callback(null, stock);
        }
    });

}