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
            //var xml=JSON.stringify(scope.chartSeries);
            var xml=null;
            if (scope.chartSeries)
                xml=JSON.parse(scope.chartSeries);
                //xml=scope.chartSeries;
            var isLocalStorage=true;
            //var meteogram = new Meteogram(xml, "meteoGraph");
            //meteogram.createChart();

            scope.$watch('chartSeries', function(newVal, oldVal) {
                if (!isLocalStorage)
                    xml = scope.chartSeries;
                var meteogram = new Meteogram(xml, "meteoGraph");
                //console.log("lpzWindHighchart -> scope.chartSeries : "+JSON.stringify(scope.chartSeries));
                meteogram.createChart();
                isLocalStorage=false;
            });

        }
    };
});


