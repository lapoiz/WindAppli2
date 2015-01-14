'use strict';

laPoizWindApp.controller('ListCtrl', ['$scope', 'AjaxServices', '$localStorage', '$display',
    function ($scope, AjaxServices, $localStorage, $display) {
        $scope.spots = $localStorage.getObject('spots');
        $display.showToast('loading data from server');

        $scope.spots = AjaxServices.getSpots().then(function(spots){
            //si j'ai une promesses positif alors j'envois mes données et je stope le chargement
            $scope.spots = spots;
            $localStorage.setObject('spots',spots);
        }), function(msg){ //sinon j'affiche mon message d'erreur
            $display.showToast("Erreur: "+msg);
        }
    }]);

laPoizWindApp.controller('DetailCtrl', ['$scope', '$stateParams', '$localStorage', 'AjaxServices', '$display',
    function ($scope, $stateParams, $localStorage, AjaxServices,  $display) {
        $scope.chartSeries = $localStorage.get('chartSeries-'+$stateParams.idSpot);
        $display.showToast('loading data from server');

        $scope.dataSpot = AjaxServices.getDataSpot($stateParams.idSpot).then(
            function(dataSpot){
                $scope.chartSeries = dataSpot;
                $localStorage.setObject('chartSeries-'+$stateParams.idSpot,dataSpot);
            }),
            function(msg){
                $display.showToast("Erreur: "+msg);
            }
    }]);
