function getStock(symbol)
{
    let text = getApiData.GetQuote(symbol);

    text = text.replace('{', '');
    text = text.replace('}', '');

    const textAr = text.split(',');
    const parAr = new Array[textAr.length + 1];
    parAr[0] = symbol;

    for (let i = 0; i < textAr.length; i++)
    {
        parAr[i+1] = textAr[i].split(' ')[1];
    }

    return new Stock(parAr[0], parAr[1], parAr[6], parAr[3], parAr[4], parAr[2], parAr[3]);
}