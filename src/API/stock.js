class Stock
{
    constructor(symbol, currentStock, time, openPrice, highPrice, lowPrice)
    {
        this.symbol = symbol;
        this.currentStock = currentStock;
        this.highPrice = time;
        this.lowPrice = openPrice;
        this.opening = highPrice;
        this.lastClose = lowPrice;
    }
}

module.exports = Stock;