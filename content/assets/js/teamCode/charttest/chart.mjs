import {getThreeMonthRange} from "../API/apidata.mjs";

let user = JSON.parse(localStorage.getItem('currentUser'));
let data = await getThreeMonthRange("AAPL", 2, "day", 1);
// window.location.search.split("=")[1]

var ctx = document.getElementById("price").getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "January", "February", "March", "April", "May"],
        datasets: [{
            label: "Price",
            backgroundColor: "rgba(240, 180, 26, 0.1)",
            borderColor: '#F0B41A',
            data: [1,2,3,4,5,6,7,8,9,10,11,12],
        }]
    },
    // Configuration options go here
    options: {
        legend: {
            display: false
        },
        animation: {
            easing: "easeInOutBack"
        },
        scales: {
            yAxes: [{
                display: !1,
                ticks: {
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold",
                    beginAtZero: !0,
                    maxTicksLimit: 5,
                    padding: 0
                },
                gridLines: {
                    drawTicks: !1,
                    display: !1
                }
            }],
            xAxes: [{
                display: !1,
                gridLines: {
                    zeroLineColor: "transparent"
                },
                ticks: {
                    padding: 0,
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold"
                }
            }]
        }
    }
});
