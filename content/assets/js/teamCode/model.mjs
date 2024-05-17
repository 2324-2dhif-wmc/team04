import {getStockName} from "./ServerClient/serverClient.mjs";

export class Stock
{
    constructor(symbol, currentStock, highPrice, lowPrice, openPrice, timestamp)
    {
        this.symbol = symbol;
        this.currentStock = currentStock;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.openPrice = openPrice;
        this.time = timestamp;
        this.getName();
    }

    getName()
    {
        getStockName(this.symbol, (error, name) =>
        {
            if(error)
            {
                console.log(error);
            }
            else
            {
                this.name = name;
            }
        })
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
<<<<<<< HEAD:src/model.mjs
    constructor(id, email, password, name) {
=======
    constructor(id, email, password, name, money, stocks) {
>>>>>>> 5f8c82c46c3a8a2523c3a0ffa32207815d96f400:src/content/assets/js/teamCode/model.mjs
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
<<<<<<< HEAD:src/model.mjs
        this.money = 0;
        this.stocks = [];
=======
        this.money = money;
        this.stocks = stocks;
>>>>>>> 5f8c82c46c3a8a2523c3a0ffa32207815d96f400:src/content/assets/js/teamCode/model.mjs
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