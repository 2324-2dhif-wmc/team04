import {getDateString, Stock} from "../model.mjs";

export async function getRange(symbol) {
    try {
        let d = new Date();
        d.setMonth(d.getMonth() - 36);
        let to = getDateString(d);

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

function formatTime(date) {
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export async function getTodayStock(symbol) {
    try {
        let d = new Date();
        d.setHours(d.getHours() - 24);
        d = getDateString(d);

        let url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/30/minute/${d}/${getDateString(new Date())}?adjusted=true&sort=desc&apiKey=aEMjzbpWJ5Z0qeGSofwG4_LDJoM9LN_5`;

        let resp = await fetch(url);
        let data = await resp.json();

        let strings = [];
        let stocks = [];
        for(let d of data.results)
        {
            let str = formatTime(new  Date(d.t * 1000));
            let stock = d.c;
            strings.push(str);
            stocks.push(stock);
        }

        return [strings, stocks];
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

export async function getMarketStatus() {
    try {
        const apiKey = "cnk1a91r01qvd1hlrv30cnk1a91r01qvd1hlrv3g";

        let url = `https://finnhub.io/api/v1/stock/market-status&exchange=US?token=${apiKey}`;
        console.log(1)
        let resp = await fetch(url);
        console.log(1)
        return await resp.json();
    } catch (error) {
        console.log("Fehler beim Abrufen der Daten:", error);
    }
}

export async function getHoliday() {
    try {
        const apiKey = "cnk1a91r01qvd1hlrv30cnk1a91r01qvd1hlrv3g";

        let url = `https://finnhub.io/api/v1/stock/market-holiday&exchange=US?token=${apiKey}`;

        let resp = await fetch(url);
        return await resp.json();
    } catch (error) {
        console.log("Fehler beim Abrufen der Daten:", error);
    }

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
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        return null;
    }
}