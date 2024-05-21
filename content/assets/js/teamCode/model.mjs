import {getStockName} from "./ServerClient/serverClient.mjs";

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