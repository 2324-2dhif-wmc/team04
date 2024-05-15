import {getQuote, getStockNews, getThreeMonthRange} from "./API/apidata.mjs";

quote();


function quote() {
    getQuote('AAPL', (error, stock) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Received stock:', stock);
        }
    });
}

function news() {
    getStockNews('AAPL', (error, data) =>
    {
        if(error)
        {
            console.log(error);
        } else {
            console.log('Received news:', data);
        }
    });
}

function monthRange()
{
    const startDate = "2023-01-01";
    const endDate = "2023-03-01";

    getThreeMonthRange('AAPL', (error, stock) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Received stock:', stock);
        }
    });
}
