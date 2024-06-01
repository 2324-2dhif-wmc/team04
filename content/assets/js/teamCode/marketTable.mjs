import {buildInfo} from "./info-manager.mjs";
const tableBody = document.getElementById('stock-table-body');

function fetchStocks() {
    fetch('http://localhost:3000/stocks')
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = '';
            data.forEach(stock => {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.textContent = stock.name;
                cell.setAttribute('data-symbol', stock.symbol);
                cell.addEventListener('click', function () {
                    const symbol = this.getAttribute('data-symbol');
                    window.location.href = "../../../stockInfo.html";
                    buildInfo(symbol);
                });
                row.appendChild(cell);
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

fetchStocks();
