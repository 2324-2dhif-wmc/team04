import { restClient } from '@polygon.io/client-js';
import {Stock} from "./stock.mjs";
import {News} from "./stock.mjs";

const rest = restClient('aEMjzbpWJ5Z0qeGSofwG4_LDJoM9LN_5');
import finnhub from 'finnhub';
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cnk1a91r01qvd1hlrv30cnk1a91r01qvd1hlrv3g";
const finnhubClient = new finnhub.DefaultApi();

const today = new Date();

function getDateString(date)
{
    return `${date.getFullYear}${date.getMonth() + 1}}-${date.getDate()}`;
}

export function getStockNews(symbol, callback)
{
    let news;
    let beginning = new Date();
    beginning.setMonth(today.getMonth()-3);
    finnhubClient.companyNewsCallback((error, data, response) =>
    {
        if(error)
        {
            callback(error, null);
        } else if(data) {
            news = new News(symbol, data.datetime, data.headline, data.img, data.src, data.summary, data.url);
            callback(null, news);
        }
        else {
            return callback(null, null);
        }
    });
}

export function getThreeMonthRange(symbol, callback) {
    var cValues = [];
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

