import {getUser, updateUser, sellStock} from "./ServerClient/serverClient.mjs";
import {getQuote} from "./API/apidata.mjs";
import {User} from "./model.mjs";

const table = document.getElementsByTagName("depotTable");
let d = JSON.parse(localStorage.getItem('currentUser'));
let user = new User(d.id, d.name, d.email, d.password, d.money, d.stocks);

async function buildTable() {
    let money = document.getElementById("wert");
    let info;
    money.innerText = "Money: " + user.money.toFixed(2) + " USD";
    let table = document.getElementById("depotTable");
    let n = user.stocks.length;

    for (const stock of user.stocks) {
        let symbol = stock.symbol;
        let val = stock.currentPrice;

        let quote = await getQuote(symbol);
        let actualValue = quote.currentPrice;

        let imagePath="../content/assets/images/icon/market-value/trends-down-icon.png";
        if (val <= actualValue) {
            imagePath = "../content/assets/images/icon/market-value/trends-up-icon.png"
        }
        let winLose = (actualValue - val) * stock.amount;

        let newRow = table.insertRow(-1);
        newRow.onclick = function () {
            window.location.href = "../content/stockInfo.html";
        }
        let img = document.createElement("img");
        img.src = imagePath;
        img.alt = "Dynamic Image";
        newRow.innerHTML = `
            <td>${symbol}</td>
            <td>${stock.amount}</td>
            <td>${val.toFixed(2)}</td>
            <td>${actualValue.toFixed(2)}</td>
            <td style="padding-left: 3%"><img src=${imagePath} alt="Impact"></td>
            <td>${winLose.toFixed(2)}</td>
            <td><button class="btn btn-primary" onclick="sellStock('${stock}')">Click Me</button></td>
            `;
    }
}

buildTable();

