import { getStockNews } from "./API/apidata.mjs";

let symbol = window.location.search.split("=")[1];


export async function buildInfo() {
    document.getElementById("stock-symbol").textContent = symbol;

    const news = await getStockNews(symbol);
    let newsContainer = document.getElementById("news");
    news.forEach((newsItem) => {
        let newsElement = document.createElement("div");
        newsElement.classList.add("col-12", "mb-4");
        newsElement.innerHTML = `
            <div class="card h-100">
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

document.getElementById('numberForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standard-Formular-Submit-Verhalten

    const numberInput = document.getElementById('numberInput').value;

    console.log(numberInput);



});
