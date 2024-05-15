import * as d3 from 'https://cdn.skypack.dev/d3'; // Einbinden von D3.js
import {dataArr} from "./dataManipulation.mjs";

// Laden der generierten Daten
const data = dataArr;

console.log(data);

// Größe des Diagramms
const width = 400;
const height = 300;

// Erstellen einer D3.js-Auswahl für das Diagrammcontainer-Element
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Erstellen der Balken im Diagramm
svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 70)
    .attr("y", (d) => height - d * 3)
    .attr("width", 65)
    .attr("height", (d) => d * 3)
    .attr("fill", "teal");

// Hinzufügen von Beschriftungen zu den Balken
svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * 70 + 30)
    .attr("y", (d) => height - d * 3 - 10)
    .attr("text-anchor", "middle")
    .attr("fill", "white");

// Funktion zum Generieren von zufälligen Daten für den Chart
function generateRandomData(numPoints) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        data.push(Math.floor(Math.random() * 100) + 1); // Zufallszahl zwischen 1 und 100
    }
    return data;
}
