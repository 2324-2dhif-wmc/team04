

export function getDateString(date)
{
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export class Stock
{
    constructor(symbol, name, currentPrice, timestamp, amount = 0)
    {
        this.symbol = symbol;
        this.name = name;
        this.currentPrice = currentPrice;
        this.time = timestamp;
        this.amount = amount;
    }
}

export class User
{
    constructor(id, email, password, name, money, stocks) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.money = money;
        this.stocks = stocks;
    }

    addStock(stock)
    {
        if(!this.stocks) {
            this.stocks = [];
        }
        if(stock) {
            this.stocks.push(stock);
            return true;
        }
        return false;
    }

    removeStock(symbol)
    {
        let rmStock = this.stocks.filter(s => s.symbol === symbol);
        this.stocks = this.stocks.filter(s => s.symbol !== symbol);
        return rmStock;
    }
}