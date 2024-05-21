import {getUser, updateUser} from "./ServerClient/serverClient.mjs";
import {getQuote} from "./API/apidata.mjs";


// Funktion um die Daten vom JSON-Server zu holen
async function fetchStocks() {
    try {
        const response = await fetch('http://localhost:3000/stocks');
        const stocks = await response.json();

        const tableBody = document.getElementById('stocks-table-body');

        stocks.forEach(stock => {
            let quote;

            getQuote(stock.symbol, (error, q) =>
            {
                if(error) {
                    console.log(error);
                }
                else {
                    quote = q;
                }
            });

            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = quote.name;
            row.appendChild(nameCell);

            const symbolCell = document.createElement('td');
            symbolCell.textContent = quote.symbol;
            row.appendChild(symbolCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = quote.price;
            row.appendChild(priceCell);

            const buyButtonCell = document.createElement('td');
            const buyButton = document.createElement('button');
            buyButton.textContent = 'Buy';
            buyButton.addEventListener('click', () => buyStock(stock));
            buyButtonCell.appendChild(buyButton);
            row.appendChild(buyButtonCell);

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching stocks:', error);
    }
}

// Funktion die aufgerufen wird, wenn der Buy-Button geklickt wird
function buyStock(stock) {
    getUser('test@gmail.com', (error, user) => {
        if (error) {
            console.error('Error:', error);
            return;
        }

        // Geld vom User abziehen
        //user.money -= stock.price;

        // Aktie zum User hinzufügen
        user.addStock(stock);

        // User updaten
        updateUser(user);
    });
}

fetchStocks();
