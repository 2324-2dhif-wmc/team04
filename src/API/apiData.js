class getApiData
{
    static GetQuote(symbol)
    {
        const finnhub = require('finnhub');

        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = "cnk1a91r01qvd1hlrv30cnk1a91r01qvd1hlrv3g"
        const finnhubClient = new finnhub.DefaultApi()

        finnhubClient.quote(symbol, (error, data, response) => {
            return data;
        });

        return null;
    }
}