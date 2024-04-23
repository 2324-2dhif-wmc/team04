import { getQuote } from "./apidata.mjs";

getQuote('AAPL', (error, stock) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Received stock:', stock);
    }
});