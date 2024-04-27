import {getThreeMonthRange} from "./apidata.mjs";

export function returnThreeMonthRange(symbol, callback) {
    getThreeMonthRange(symbol, (error, stock) => {
        if (error) {
            console.error('Error:', error);
        } else {
            callback(stock);
        }
    });
}

export let dataArr = returnThreeMonthRange('AAPL', (stock) => {
    return stock;
});
