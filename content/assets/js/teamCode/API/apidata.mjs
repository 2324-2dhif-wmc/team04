import {Stock} from "../model.mjs";

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

export async function getThreeMonthRange(symbol, range, span, mul) {
    let from = getDateString(new Date());
    let to = getDateString(new Date().getDate() - range);
    let url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${mul}/${span}/${from}/${to}?adjusted=true&sort=asc&apiKey=aEMjzbpWJ5Z0qeGSofwG4_LDJoM9LN_5`;

    let val = [];
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for(let d in data) {
                val.push([data[d]].c);
            }
            return val;
        })
        .catch(error => {return null;})
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


export async function getQuote(symbol, callback) {
    let key = "cnk1a91r01qvd1hlrv30cnk1a91r01qvd1hlrv3g";
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            return new Stock(symbol, data.c, data.h, data.l, data.o, data.t);
        })
        .catch(error => {return null;});
}