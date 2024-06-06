import {getMonthRange} from "../API/apidata.mjs";
import {getStockName, fetchStock} from "../ServerClient/serverClient.mjs";

let names = [];
let stocks = [];
let data = [];
let graphs = [];
let button = document.getElementById("button");

button.onclick = async function() {
    let input = document.getElementById("stockInput");
    let stock = await fetchStock(input.value);
    if (stock) {
        names.push(stock);
        let st = await getMonthRange(stock);
        stocks.push(st);
    }
    input.innerText = "";
    getDataProviderDate();
    getGraphs();
    Chart();
};

function Chart()
{
    if ($('#chart').length) {

        var chart = AmCharts.makeChart("chart", {
            "type": "serial",
            "theme": "light",
            "legend": {
                "useGraphSettings": true
            },
            "dataProvider": data,
            "startDuration": 0.5,
            "graphs": graphs,
            "chartCursor": {
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "date",
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0,
                "fillAlpha": 0.05,
                "fillColor": "#000000",
                "gridAlpha": 0,
                "position": "top"
            },
            "export": {
                "enabled": false
            }
        });
    }
}

Chart;

function getDataProviderDate()
{
    data = [];
    for (let i = 0; i < stocks.length; i++) {
        for(let j = 0; j < stocks[i].length; j++) {
            if (i === 0) data.push({date: formatDate(stocks[i][j].date)});
            data[j][names[i]] = stocks[i][j].data;
        }
    }
}

function formatDate(date) {
    let month = (date.getMonth()+1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${month}:${day}`;
}

function getGraphs()
{
    graphs = [];
    for (let i = 0; i < names.length; i++) {
        graphs.push({
            "balloonText": `${names[i]}, [[value]]`,
            "bullet": "round",
            "hidden": false,
            "title": `${names[i]}`,
            "valueField": `${names[i]}`,
            "fillAlphas": 0,
            "lineColor": "#31ef98",
            "lineThickness": 2,
            "negativeLineColor": "#17e285",
        });
    }
}