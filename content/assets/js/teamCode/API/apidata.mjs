import {getDateString, Stock} from "../model.mjs";


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
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        return null;
    }
}

export async function getRange(symbol) {
    try {
        let d = new Date();
        d.setMonth(d.getMonth() - 36);
        let to = getDateString(d);
        console.log(to);

        let url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${to}/${getDateString(new Date())}?adjusted=true&sort=asc&apiKey=aEMjzbpWJ5Z0qeGSofwG4_LDJoM9LN_5`;

        let resp = await fetch(url);
        let data = await resp.json();

        return data.results.map(d => ({
            date: new Date(d.t),
            visits: d.c,
        }));
    } catch (error) {
        console.log("Fehler beim Abrufen der Daten:", error);
    }
}

export async function getQuote(symbol) {
    let key = "cnk1a91r01qvd1hlrv30cnk1a91r01qvd1hlrv3g";
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Stock(symbol, data.c, data.h, data.l, data.o, data.t);
}