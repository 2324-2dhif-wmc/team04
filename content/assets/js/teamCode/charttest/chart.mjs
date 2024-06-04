import {getRange, getTodayStock} from "../API/apidata.mjs";

if ($('#price').length) {
    let range = await getRange(window.location.search.split("=")[1]);
    let today = await getTodayStock(window.location.search.split("=")[1]);

    var chartData = range;
    console.log(chartData);
    var chart = AmCharts.makeChart("price", {
        "type": "serial",
        "theme": "light",
        "marginRight": 20,
        "autoMarginOffset": 20,
        "marginTop": 7,
        "dataProvider": chartData,
        "valueAxes": [{
            "axisAlpha": 0.2,
            "dashLength": 1,
            "position": "left"
        }],
        "mouseWheelZoomEnabled": true,
        "graphs": [{
            "id": "g1",
            "balloonText": "[[value]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "hideBulletsCount": 50,
            "title": "red line",
            "valueField": "visits",
            "useLineColorForBulletBorder": true,
            "balloon": {
                "drop": true
            }
        }],
        "chartScrollbar": {
            "autoGridCount": true,
            "graph": "g1",
            "scrollbarHeight": 40,
            "color": "#fff",
            "selectedBackgroundAlpha": 1,
            "selectedBackgroundColor": "#815BF6",
            "selectedGraphFillAlpha": 0,
            "selectedGraphFillColor": "#8918FE",
            "graphLineAlpha": 0.2,
            "graphLineColor": "#c2c2c2",
            "selectedGraphLineColor": "#fff",
            "selectedGraphLineAlpha": 1
        },
        "chartCursor": {
            "limitToGraph": "g1"
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "axisColor": "#DADADA",
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": false
        }
    });
}


if ($('#today').length) {
    let [str, stock] = await getTodayStock(window.location.search.split("=")[1]);

    console.log(str);
    console.log(stock);
    var myConfig = {
        "type": "line",

        "scale-x": { //X-Axis
            "labels": ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
            "label": {
                "font-size": 14,
                "offset-x": 0,
            },
            "item": { //Scale Items (scale values or labels)
                "font-size": 10,
            },
            "guide": { //Guides
                "visible": false,
                "line-style": "solid", //"solid", "dotted", "dashed", "dashdot"
                "alpha": 1
            }
        },
        "plot": { "aspect": "spline" },
        "series": [{
            "values": [20, 25, 30, 35, 45, 40, 40, 35, 25, 17, 40, 50],
            "line-color": "#F0B41A",
            "line-width": 5 ,// px
            "marker": {
                "background-color": "#D79D3B",
                "size": 5, // px
                "border-color": "#D79D3B",
            }}]
    };

    zingchart.render({
        id: 'verview-shart',
        data: myConfig,
        height: "100%",
        width: "100%"
    });
}
