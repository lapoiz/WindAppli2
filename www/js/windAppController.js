'use strict';

laPoizWindApp.controller('ListCtrl', ['$scope', 'AjaxServices', '$localStorage', '$display',
    function ($scope, AjaxServices, $localStorage, $display) {
        $scope.listSpots = $localStorage.getObject('spots');
        $display.showToast('loading data from server');
        try {
            $scope.spots = AjaxServices.getSpots().then(
                function(spots){
                    $scope.listSpots = spots;
                    $localStorage.setObject('spots',spots);
                }), function(msg){ //sinon j'affiche mon message d'erreur
                    $display.showToast("Erreur: "+msg);
                }
        } catch(e) {
            error(e);
            $display.showToast("Erreur du serveur: ");
        }
    }]);

laPoizWindApp.controller('DetailCtrl', ['$scope', '$stateParams', '$localStorage', 'AjaxServices', '$display',
    function ($scope, $stateParams, $localStorage, AjaxServices,  $display) {
        $scope.chartSeries = $localStorage.get('chartSeries-'+$stateParams.idSpot);
        $scope.spotName = $localStorage.get('spotName-'+$stateParams.idSpot);
        if (!$scope.spotName) {
            $scope.spotName="Spot";
        }
        $display.showToast('loading data from server');

        $scope.dataSpot = AjaxServices.getDataSpot($stateParams.idSpot).then(
            function(dataSpot){
                $scope.chartSeries = dataSpot;
                $scope.spotName=dataSpot.spot;
                $localStorage.setObject('chartSeries-'+$stateParams.idSpot,dataSpot);
                $localStorage.set('spotName-'+$stateParams.idSpot,dataSpot.spot);
            }),
            function(msg){
                $display.showToast("Erreur: "+msg);
            }
    }]);
