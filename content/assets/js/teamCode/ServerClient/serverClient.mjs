import {User} from "../model.mjs";

const userUrl = 'http://localhost:3000/users';
const stockUrl = 'http://localhost:3000/stocks';

export function updateUser(user) {
    fetch(`${userUrl}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(data => localStorage.setItem('currentUser', JSON.stringify(user)))
        .catch(error => console.error('Error:', error));
}

export async function getUser(email)
{
    try {
        let resp = await fetch(`${userUrl}?email=${email}`);
        let js = await resp.json();
        let data = js[0];
        return new User(data.id, data.email, data.password, data.name, data.money, data.stocks);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getStockName(symbol)
{
    try {
        let resp = await fetch(`${stockUrl}?symbol=${symbol}`)
        let data = await resp.json();
        return data[0].name;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function buyStock(stock)
{
    let us = JSON.parse(localStorage.getItem('currentUser'));
    let user = new User(us.id, us.email, us.password, us.name, us.money, us.stocks);
    user.addStock(stock);
    user.money -= stock.currentPrice * stock.amount;

    updateUser(user);
}

export async function sellStock(stock)
{
    console.log(stock);
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let oldStock = user.removeStock(stock.symbol);
    user.money += stock.currentPrice * oldStock.amount;

    updateUser(user);
}