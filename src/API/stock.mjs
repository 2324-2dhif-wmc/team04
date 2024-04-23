export class Stock
{
    constructor(symbol, currentStock, tradeSize, market, timestamp)
    {
        this.symbol = symbol;
        this.currentStock = currentStock;
        this.tradeSize = tradeSize;
        this.market = market;
        this.time = timestamp;
    }
}



const Market= Object.freeze({
    NYSE: '1',
    AMEX: '2',
    Nasdaq: '3'
});

function getColorName(num)
{
    for (const name in Market) {
        if (Market[name] === num) {
            return name;
        }
    }
    return null;
}

