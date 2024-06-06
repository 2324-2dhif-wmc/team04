import { sellStock } from "./ServerClient/serverClient.mjs";
import { getQuote } from "./API/apidata.mjs";
import { User } from "./model.mjs";

const table = document.getElementById("depotTable");
let d = JSON.parse(localStorage.getItem('currentUser'));
let user = new User(d.id, d.name, d.email, d.password, d.money, d.stocks);

function umleiten(symbol) {
    const basisUrl = "../content/stockInfo.html?symbol=";
    window.location.href = `${basisUrl}` + symbol;
}

window.umleiten = umleiten;

async function buildTable() {
    let money = document.getElementById("wert");
    money.innerText = "Money: " + user.money.toFixed(2) + " USD";

    for (const stock of user.stocks) {
        let symbol = stock.symbol;
        let val = stock.currentPrice;

        let quote = await getQuote(symbol);
        let actualValue = quote.currentPrice;

        let imagePath = "../content/assets/images/icon/market-value/trends-down-icon.png";
        if (val <= actualValue) {
            imagePath = "../content/assets/images/icon/market-value/trends-up-icon.png";
        }
        let winLose = (actualValue - val) * stock.amount;

        let newRow = table.insertRow(-1);

        newRow.innerHTML = `
            <td onclick="umleiten('${symbol}')">${symbol}</td> 
            <td>${stock.amount}</td>
            <td>${val.toFixed(2)}</td>
            <td>${actualValue.toFixed(2)}</td>
            <td style="padding-left: 3%"><img src="${imagePath}" alt="Impact"></td>
            <td>${winLose.toFixed(2)}</td>
            <td>
                <button class="btn btn-primary" onclick="sellStock('${JSON.stringify(stock)}')">Sell</button>
            </td>
        `;
    }
}

buildTable();
