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
