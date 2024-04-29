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
