import { restClient } from '@polygon.io/client-js';
const rest = restClient('hfWWLRN1okw1sX49EmIQ1ccVwaS1GbdF');


export function getThreeMonthRange(symbol, from, to) {
    const cValues = [];
    rest.stocks.aggregates(symbol, 1, "day", from, to).then((data) => {
        for(let i = 0; i < data.results.length; i++) {
            cValues.push(data.results[i].c);
        }
    });
    return [cValues, from, to]
}

export function generateDateRangeArray(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dateArray.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}


const startDate = "2023-01-01";
const endDate = "2023-03-01";
