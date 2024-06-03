import {getStockName} from "./ServerClient/serverClient.mjs";

export function getDateString(date)
{
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export class Stock
{
    constructor(symbol, name, currentStock, highPrice, lowPrice, openPrice, timestamp)
    {
        this.symbol = symbol;
        this.name = name;
        this.currentStock = currentStock;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.openPrice = openPrice;
        this.time = timestamp;
    }
}

export class News
{
    constructor(symbol, time, headline, img, src, summary, url)
    {
        this.symbol = symbol;
        this.time = time;
        this.headline = headline;
        this.img = img;
        this.src = src;
        this.summary = summary;
        this.url = url;
    }
}

export class User
{
    constructor(id, email, password, name, money, stocks) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.money = 0;
        this.stocks = [];
        this.money = money;
        this.stocks = stocks;
    }

    addStock(stock)
    {
        if(stock)
        {
            this.stocks.push(stock);
            return true;
        }
        return false;
    }

    removeStock(symbol)
    {
        return this.stocks.filter(s => s.symbol === symbol);
    }
}

export class Info
{
    constructor(date, val)
    {
        this.date = getDateString(new Date(date*1000));
        this.val = val;
    }
}