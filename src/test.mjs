import {getQuote, getStockNews, getThreeMonthRange} from "./API/apidata.mjs";
import {updateUser} from "./ServerClient/serverClient.mjs";
import { User, Stock } from "./model.mjs";

let user = new User("1234", "test@gmail.com", "test");
let s = new Stock("AAPL", 100, 100,100, 100, 1234567876);
user.addStock(s);
user.money = 50000;

updateUser(user);

function quote() {
    getQuote('AAPL', (error, stock) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Received stock:', stock);
            s = stock;
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
