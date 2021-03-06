
function Meteogram(xml, container) {
    this.windDirections = [];
    this.windDirectionNames = [];

    this.windGuru = [];
    this.windFinder = [];
    this.meteoFrance = [];

    this.symbols = [];
    this.symbolNames = [];
    this.maree = [];
    this.updateWind = [];

    // Initialize
    this.xml = xml;
    this.container = container;

    // Run
    this.parseYrData();
}


/**
 * Return weather symbol sprites as laid out at http://om.yr.no/forklaring/symbol/
 */
Meteogram.prototype.getSymbolSprites = function (symbolSize) {
    return {
        '01d': {
            x: 0,
            y: 0
        },
        '01n': {
            x: symbolSize,
            y: 0
        },
        '16': {
            x: 2 * symbolSize,
            y: 0
        },
        '02d': {
            x: 0,
            y: symbolSize
        },
        '02n': {
            x: symbolSize,
            y: symbolSize
        },
        '03d': {
            x: 0,
            y: 2 * symbolSize
        },
        '03n': {
            x: symbolSize,
            y: 2 * symbolSize
        },
        '17': {
            x: 2 * symbolSize,
            y: 2 * symbolSize
        },
        '04': {
            x: 0,
            y: 3 * symbolSize
        },
        '05d': {
            x: 0,
            y: 4 * symbolSize
        },
        '05n': {
            x: symbolSize,
            y: 4 * symbolSize
        },
        '18': {
            x: 2 * symbolSize,
            y: 4 * symbolSize
        },
        '06d': {
            x: 0,
            y: 5 * symbolSize
        },
        '06n': {
            x: symbolSize,
            y: 5 * symbolSize
        },
        '07d': {
            x: 0,
            y: 6 * symbolSize
        },
        '07n': {
            x: symbolSize,
            y: 6 * symbolSize
        },
        '08d': {
            x: 0,
            y: 7 * symbolSize
        },
        '08n': {
            x: symbolSize,
            y: 7 * symbolSize
        },
        '19': {
            x: 2 * symbolSize,
            y: 7 * symbolSize
        },
        '09': {
            x: 0,
            y: 8 * symbolSize
        },
        '10': {
            x: 0,
            y: 9 * symbolSize
        },
        '11': {
            x: 0,
            y: 10 * symbolSize
        },
        '12': {
            x: 0,
            y: 11 * symbolSize
        },
        '13': {
            x: 0,
            y: 12 * symbolSize
        },
        '14': {
            x: 0,
            y: 13 * symbolSize
        },
        '15': {
            x: 0,
            y: 14 * symbolSize
        },
        '20d': {
            x: 0,
            y: 15 * symbolSize
        },
        '20n': {
            x: symbolSize,
            y: 15 * symbolSize
        },
        '20m': {
            x: 2 * symbolSize,
            y: 15 * symbolSize
        },
        '21d': {
            x: 0,
            y: 16 * symbolSize
        },
        '21n': {
            x: symbolSize,
            y: 16 * symbolSize
        },
        '21m': {
            x: 2 * symbolSize,
            y: 16 * symbolSize
        },
        '22': {
            x: 0,
            y: 17 * symbolSize
        },
        '23': {
            x: 0,
            y: 18 * symbolSize
        }
    };
};


/**
 * Draw the weather symbols on top of the temperature series. The symbols are sprites of a single
 * file, defined in the getSymbolSprites function above.
 */
Meteogram.prototype.drawWeatherSymbols = function (chart) {
    var meteogram = this,
        symbolSprites = this.getSymbolSprites(30);

    //angular.forEach(chart.series[0].data, function (i, point) {
    $.each(chart.series[0].data, function (i, point) {
        var sprite,
            group;

        if (meteogram.resolution > 36e5 || i % 2 === 0) {

            sprite = symbolSprites[meteogram.symbols[i]];
            if (sprite) {

                // Create a group element that is positioned and clipped at 30 pixels width and height
                group = chart.renderer.g()
                    .attr({
                        translateX: point.plotX + chart.plotLeft - 15,
                        //translateY: point.plotY + chart.plotTop - 30,
                        translateY: 50,
                        zIndex: 5
                    })
                    .clip(chart.renderer.clipRect(0, 0, 30, 30))
                    .add();

                // Position the image inside it at the sprite position
                chart.renderer.image('img/meteogram-symbols-30px.png',
                        //'../images/meteogram-symbols-30px.png',
                        -sprite.x,
                        -sprite.y,
                        90,
                        570
                    )
                    .add(group);
            }
        }
    });
};

/**
 * Build and return the Highcharts options structure
 */
Meteogram.prototype.getChartOptions = function () {
    var meteogram = this;

    return {
        global: {
            useUTC: false
        },
        chart: {
            renderTo: this.container,
            marginBottom: 70,
            marginRight: 40,
            marginTop: 50,
            plotBorderWidth: 1,
            width: 800,
            height: 310
        },

        title: {
            text: "Prévision"
            //align: 'left'
        },

        xAxis: [{ // Bottom X axis
            type: 'datetime',
            gridLineWidth: 1,
            gridLineColor: (Highcharts.theme && Highcharts.theme.background2) || '#F0F0F0',
            tickInterval: 6 * 36e5, // 6 hours
            //minorTickInterval: 2 * 36e5, // 2 hours
            startOnTick: false,
            endOnTick: false,
            minPadding: 0,
            maxPadding: 0,
            offset: 30,
            labels: {
                format: '{value:%H}'
            }
        }, { // Top X axis
            linkedTo: 0,
            type: 'datetime',
            tickInterval: 24 * 3600 * 1000,
            labels: {
                format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %e %b}',
                align: 'left',
                x: 10,
                y: -5
            },
            opposite: true,
            tickLength: 20,
            showLastLabel: false,
            gridLineWidth: 1
        }],

        yAxis: [
            { // Vent axis
                title: {
                    text: null
                },
                labels: {
                    format: '{value} Nd',
                    style: {
                        fontSize: '10px'
                    },
                    x: -3
                },
                plotLines: [{ // zero plane
                    value: 0,
                    color: '#BBBBBB',
                    width: 1,
                    zIndex: 2
                }],
                gridLineColor: (Highcharts.theme && Highcharts.theme.background2) || '#F0F0F0',

                plotBands: [{ // Light air
                    from: 0,
                    to: 12,
                    color: 'rgba(68, 170, 213, 0.1)',
                    zIndex: 1
                }]
            }, { // Marée
                allowDecimals: false,

                title: { // Title on top of axis
                    text: 'Marée',
                    offset: 0,
                    align: 'low',
                    rotation: 90,
                    style: {
                        fontSize: '10px',
                        color: Highcharts.getOptions().colors[2]
                    },
                    textAlign: 'left',
                    x: 5,
                    y: -34
                },
                max: 30,
                min: 0,
                labels: {
                    enabled: false
                },
                gridLineWidth: 0,
                opposite: true,
                showLastLabel: false
            }
        ],

        legend: {
            useHTML: true,
            labelFormatter: function() { return this.name + (this.name!='Marée'?' <span style="font-size: xx-small; font-weight: lighter">(update 14h00)</span>':'') },
            y: 15
        },

        tooltip: {
            formatter: function() {
                return  ' ' +
                    Highcharts.dateFormat('%H:%M - %a %d %b', new Date(this.x)) + '<br/>'+
                    '<b>' + this.series.name +'</b>:' + this.y ;
            }
        },

        series: [{
            name: 'WindGuru',
            data: this.windGuru,
            type: 'spline',
            tooltip: {
                valueSuffix: ' Nd'
            },
            zIndex: 1,
            marker: {
                enabled: false
            },
            color: '#40A3EF',
            negativeColor: '#48AFE8'
        },{
            name: 'Météo France',
            data: this.meteoFrance,
            type: 'spline',
            zIndex: 1,
            marker: {
                enabled: false
            },
            color: '#C5CBD0',
            negativeColor: '#48AFE8'
        },{
            name: 'WindFinder',
            data: this.windFinder,
            type: 'spline',
            zIndex: 1,
            marker: {
                enabled: false
            },
            color: '#FF3333',
            negativeColor: '#48AFE8'
        }, {
            name: 'Marée',
            color: Highcharts.getOptions().colors[2],
            data: this.maree,
            type: 'spline',
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            yAxis: 1
        }]

    }
};


/**
 * Draw the weather symbols on top of the temperature series. The symbols are sprites of a single
 * file, defined in the getSymbolSprites function above.
 */
Meteogram.prototype.drawWeatherSymbols = function (chart) {
    var meteogram = this,
        symbolSprites = this.getSymbolSprites(30);

    //angular.forEach(chart.series[0].data, function (i, point) {
    $.each(chart.series[0].data, function (i, point) {
        var sprite,
            group;

        if (meteogram.resolution > 36e5 || i % 2 === 0) {

            sprite = symbolSprites[meteogram.symbols[i]];
            if (sprite) {

                // Create a group element that is positioned and clipped at 30 pixels width and height
                group = chart.renderer.g()
                    .attr({
                        translateX: point.plotX + chart.plotLeft - 15,
                        //translateY: point.plotY + chart.plotTop - 30,
                        translateY: 50,
                        zIndex: 5
                    })
                    .clip(chart.renderer.clipRect(0, 0, 30, 30))
                    .add();

                // Position the image inside it at the sprite position
                chart.renderer.image('img/meteogram-symbols-30px.png',
                        -sprite.x,
                        -sprite.y,
                        90,
                        570
                    )
                    .add(group);
            }
        }
    });
};

/**
 * Create wind speed symbols for the Beaufort wind scale. The symbols are rotated
 * around the zero centerpoint.
 */
Meteogram.prototype.windArrow = function (name) {
    var path;

    // The stem and the arrow head
    path = [
        'M', 0, 7, // base of arrow
        'L', -1.5, 7,
        0, 10,
        1.5, 7,
        0, 7,
        0, -10 // top
    ];

    path.push(0, -10, 7, -10); // long line

    return path;
};

/**
 * Draw the wind arrows. Each arrow path is generated by the windArrow function above.
 */
Meteogram.prototype.drawWindArrows = function (chart) {
    var meteogram = this;

    //angular.forEach(chart.series[0].data, function (i, point) {
    $.each(chart.series[0].data, function (i, point) {
        var sprite, arrow, x, y;

        if (meteogram.resolution > 36e5 || i % 2 === 0) {

            // Draw the wind arrows
            x = point.plotX + chart.plotLeft + 7;
            y = 255;
            console.log("Meteogram - drawWindArrows i:"+i);
            arrow = chart.renderer.path(
                    meteogram.windArrow(meteogram.windSpeedNames[i])
                ).attr({
                    rotation: parseInt(meteogram.windDirections[i], 10),
                    translateX: x, // rotation center
                    translateY: y // rotation center
                });

            arrow.attr({
                stroke: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                'stroke-width': 1.5,
                zIndex: 5
            }).add();
        }
    });
};

/**
 * Draw blocks around wind arrows, below the plot area
 */
Meteogram.prototype.drawBlocksForWindArrows = function (chart) {
    var xAxis = chart.xAxis[0],
        x,
        pos,
        max,
        isLong,
        isLast,
        i;

    for (pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i += 1) {

        // Get the X position
        isLast = pos === max + 36e5;
        x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

        // Draw the vertical dividers and ticks
        if (this.resolution > 36e5) {
            isLong = pos % this.resolution === 0;
        } else {
            isLong = i % 2 === 0;
        }
        chart.renderer.path(['M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
                'L', x, chart.plotTop + chart.plotHeight + 32, 'Z'])
            .attr({
                'stroke': chart.options.chart.plotBorderColor,
                'stroke-width': 1
            })
            .add();
    }
};

/**
 * Post-process the chart from the callback function, the second argument to Highcharts.Chart.
 */
Meteogram.prototype.onChartLoad = function (chart) {
    //this.drawWeatherSymbols(chart);
    //this.drawWindArrows(chart);
    //this.drawBlocksForWindArrows(chart);
};


/**
 * Create the chart. This function is called async when the data file is loaded and parsed.
 */
Meteogram.prototype.createChart = function () {
    var meteogram = this;
    this.chart = new Highcharts.Chart(this.getChartOptions(), function (chart) {
        meteogram.onChartLoad(chart);
    });
};

/**
 * Handle the data. This part of the code is not Highcharts specific, but deals with yr.no's
 * specific data format
 */
Meteogram.prototype.parseYrData = function () {

    var meteogram = this,
        xml = this.xml,
        pointStart;

    if (!xml || !xml.forecast) {
        //angular.element(document.querySelector( '#loading')).html('<i class="fa fa-frown-o"></i> Failed loading data, please try again later');
        if (!xml)
            console.warn("Meteogram: Failed loading data - JSon empty");
        else
            console.warn("Meteogram: Failed loading data - JSon without forecast inside");
        //console.debug("xml: "+xml);
        //console.debug("Json: "+JSON.stringify(xml));
        return;
    };


    //angular.forEach(xml.forecast, function (i, time) {
    $.each(xml.forecast, function (i, time) {
        var datePrev=time.date;

        // Populate the parallel arrays
        if (typeof(time.symbols) != 'undefined') {
            meteogram.symbols.push(time.symbol['@attributes']['var'].match(/[0-9]{2}[dnm]?/)[0]);
            meteogram.symbolNames.push(time.symbol['@attributes'].name);
        }

        if (typeof(time.WindFinder) != 'undefined') {
            meteogram.windFinder.push({
                x: datePrev,
                y: parseFloat(time.WindFinder)
            });
        }

        if (typeof(time.maree) != 'undefined') {
            meteogram.maree.push({
                x: datePrev,
                y: parseFloat(time.maree)
            });
        }

        if (typeof(time.Windguru) != 'undefined') {
            meteogram.windGuru.push({
                x: datePrev,
                y: parseFloat(time.Windguru)
            });
        }

        if (typeof(time.orientation) != 'undefined') {
            meteogram.windDirections.push(parseFloat(time.orientation.deg));
            meteogram.windDirectionNames.push(time.orientation.name);
        }
    });

    // Create the chart when the data is loaded
    this.createChart();
};
// End of the Meteogram protype
