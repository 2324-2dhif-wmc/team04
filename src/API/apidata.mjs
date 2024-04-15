import { restClient } from '@polygon.io/client-js';
const rest = restClient('hfWWLRN1okw1sX49EmIQ1ccVwaS1GbdF');

rest.stocks.aggregates("AAPL", 1, "day", "2023-01-01", "2023-04-14").then((data) => {
    console.log(data);
}).catch(e => {
    console.error('An error happened:', e);
});