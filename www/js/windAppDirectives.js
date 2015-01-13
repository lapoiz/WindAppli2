'use strict';

/**
 * lpz-wind-highchart
 * LaPoiz directive pour afficher le graphique sur le vent, grace à la librairie Highchart
 */
laPoizWindApp.directive('lpzWindHighchart', function() {
    return {
        restrict: 'E',
        replace: true,
        template : '<div><div id="loading"></div><div id="meteoGraph"></div></div>',
        link: function(scope, element, attrs, ctrl) {
            //console.log("lpzWindHighchart");
            var meteogram = new Meteogram(scope.chartSeries, "meteoGraph");
            meteogram.createChart();

            scope.$watch('chartSeries', function(newVal, oldVal) {
                meteogram.xml = scope.chartSeries;
                //console.log("lpzWindHighchart -> scope.chartSeries : "+JSON.stringify(scope.chartSeries));
                meteogram.parseYrData();
            });

        }
    };
});


