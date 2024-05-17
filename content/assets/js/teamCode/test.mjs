import {getQuote, getStockNews, getThreeMonthRange} from "./API/apidata.mjs";
import {updateUser, getUser, getStockName} from "./ServerClient/serverClient.mjs";
import { User, Stock } from "./model.mjs";


//getQuote();


let user = new User("1234", "test@gmail.com", "test", "test", 50000, []);
let s = new Stock("AAPL", 100, 100,100, 100, 1234567876);
user.addStock(s);

console.log(user);
/*
user.money = 50000;

updateUser(user);

quote();

getUser("test@gmail.com", (error, user) => {
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(user);
    }
});

*/

/*
getStockName("AAPL", (error, nam) =>
{
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log(nam);
        }
})

*/


function quote() {
    getQuote('MRVL', (error, stock) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Received stock:', stock);
        }
    });
}

function news() {
    getStockNews('PRNB', (error, data) =>
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
