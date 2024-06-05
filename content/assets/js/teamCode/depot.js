import {getUser} from "./ServerClient/serverClient.mjs";
import {getQuote} from "./API/apidata.mjs";

const table = document.getElementsByTagName("depotTable");


let user = JSON.parse(localStorage.getItem('currentUser'));
let fixedUser;
let flag = false;
await getUser(user.email, (error, user) => {
    if(error)
    {
        console.log(error);
    }
    fixedUser = user;
    flag = true;
});
while (!flag) {
    await new Promise(resolve => setTimeout(resolve, 100));
}

async function buildTable() {
    let money = document.getElementById("wert");
    let info;
    money.innerText = "Money: " + fixedUser.money.toFixed(2) + " USD";
    let table = document.getElementById("depotTable");
    let n = fixedUser.stocks.length;
    for (let i = 0; i < n; i++) {
        let symbol = fixedUser.stocks[i].symbol;
        let val = fixedUser.stocks[i].price;

        let actualValue;
        await getQuote(symbol).then(stock => {
            actualValue = stock.currentStock;
        });

        let imagePath="../content/assets/images/icon/market-value/trends-down-icon.png";
        if (val <= actualValue) {
            imagePath = "../content/assets/images/icon/market-value/trends-up-icon.png"
        }
        let winLose = actualValue - val;


        let newRow = table.insertRow(-1);
        newRow.onclick = function () {
            window.location.href = "../content/stockInfo.html";
        }
        let img = document.createElement("img");
        img.src = imagePath;
        img.alt = "Dynamic Image";
        newRow.innerHTML = `
            <td>${symbol}</td>
            <td>${fixedUser.stocks[i].amount}</td>
            <td>${val.toFixed(2)}</td>
            <td>${actualValue.toFixed(2)}</td>
            <td style="padding-left: 3%"><img src=${imagePath} alt="Impact"></td>
            <td>${winLose.toFixed(2)}</td>
            <td><button class="btn btn-primary" onclick="sellStock()">Click Me</button></td>
            `;

    }
}

buildTable();

function sellStock(symbol){

}