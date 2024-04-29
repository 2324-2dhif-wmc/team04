import {getQuote, getThreeMonthRange} from "./apidata.mjs";

/*
getQuote('AAPL', (error, stock) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Received stock:', stock);
    }
});

getStockNews('AAPL', (error, news) => {
    if (error) {
        console.error('Error:', error);
    }
    else {
        console.log('Received news:', news);
    }
})

*/

const startDate = "2023-01-01";
const endDate = "2023-03-01";

getThreeMonthRange('AAPL', (error, stock) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Received stock:', stock);
    }
});