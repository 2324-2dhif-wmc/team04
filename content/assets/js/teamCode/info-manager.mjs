import { getStockNews, getQuote } from "./API/apidata.mjs";
import {buyStock, getUser} from "./ServerClient/serverClient.mjs";
import {buy} from "./UserInteraction/buySell.mjs";

let symbol = window.location.search.split("=")[1];

export async function buildInfo() {
    document.getElementById("stock-symbol").textContent = symbol;

    const news = await getStockNews(symbol);
    let newsContainer = document.getElementById("news");
    news.forEach((newsItem) => {
        let newsElement = document.createElement("div");
        newsElement.classList.add("col-12", "mb-4");
        newsElement.innerHTML = `
            <div class="card h-100" style = "width: 70%">
                <img src="${newsItem.image}" class="card-img-top" alt="${newsItem.headline}">
                <div class="card-body">
                    <h5 class="card-title">${newsItem.headline}</h5>
                    <p class="card-text">${newsItem.summary}</p>
                    <a href="${newsItem.url}" target="_blank" class="btn btn-primary">Read More</a>
                </div>
            </div>`;
        newsContainer.appendChild(newsElement);
    });
}

buildInfo();
let info;

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


getQuote(symbol).then(stock => {
    let element = document.getElementById("quote");
    element.innerHTML = stock.currentStock + " USD";
    info = stock;
});



document.getElementById('numberForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const numberInput = document.getElementById('numberInput').value;
    buyStock(fixedUser, info, numberInput).then(() => alert("Stock bought!"));

});
