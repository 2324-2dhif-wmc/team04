import {getUser, sellStock} from "./ServerClient/serverClient.mjs";
import { getQuote } from "./API/apidata.mjs";

async function handleButtonClick(symbol){
    let stock = await getQuote(symbol);
    await sellStock(stock);

    deleteAllRows();
    await buildTable();
}

function umleiten(symbol) {
    const basisUrl = "../content/stockInfo.html?symbol=";
    window.location.href = `${basisUrl}` + symbol;
}

function deleteAllRows(table) {
    let t = document.getElementById("depotTable");
    let rowCount = t.rows.length;

    // Iterate from the end to the start to avoid index shifting issues
    for (let i = rowCount - 1; i > 0; i--) {
        t.deleteRow(-1);
    }
}

window.umleiten = umleiten;
window.handleButtonClick = handleButtonClick;

async function buildTable() {
    let user = await getUser(JSON.parse(localStorage.getItem('currentUser')).email);
    let table = document.getElementById("depotTable");

    let money = document.getElementById("wert");
    money.innerText = "Money: " + user.money.toFixed(2) + " USD";

    for (let stock of user.stocks) {
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
                <button class="btn btn-primary" onclick="handleButtonClick('${symbol}')">Sell</button>
            </td>
        `;
    }
}

await buildTable();
