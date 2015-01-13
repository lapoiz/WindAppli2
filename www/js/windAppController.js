'use strict';

laPoizWindApp.controller('ListCtrl', ['$scope', 'AjaxServices', '$localStorage', '$cordovaToast',
    function ($scope, AjaxServices, $localStorage, $cordovaToast) {
        //console.log("in ListCtrl");
        $scope.spots = $localStorage.getObject('spots');
        //$cordovaToast.show('loading data from server', 'long', 'top');
/*
        $cordovaToast.showShortTop('loading data from server').then(function(success) {
            // success
            console.log("Toast success");
        }, function (error) {
            // error
            console.log("Toast error: "+error);
        });
*/
        $scope.spots = AjaxServices.getSpots().then(function(spots){
            //si j'ai une promesses positif alors j'envois mes données et je stope le chargement
            $scope.spots = spots;
            $localStorage.setObject('spots',spots);
        }), function(msg){ //sinon j'affiche mon message d'erreur
            console.log("Erreur ");
            $ionicPopup.alert({
                title: 'Error',
                template: msg
            });
        }
    }]);

laPoizWindApp.controller('DetailCtrl', ['$scope', '$stateParams', '$localStorage', 'AjaxServices', '$cordovaToast',
    function ($scope, $stateParams, $localStorage, AjaxServices,  $cordovaToast) {
        //console.log("in DetailCtrl");
        //console.log("$stateParams.idSpot "+$stateParams.idSpot);
        //$scope.chartSeries = $localStorage.getObject('chartSeries-'+$stateParams.idSpot);
        $scope.chartSeries = $localStorage.get('chartSeries-'+$stateParams.idSpot);
//        $cordovaToast.show('loading data from server', 'long', 'top');
/*        $cordovaToast.showShortTop('loading data from server').then(function(success) {
            // success
            console.log("Toast success");
        }, function (error) {
            // error
            console.log("Toast error: "+error);
        });
*/
        $scope.dataSpot = AjaxServices.getDataSpot($stateParams.idSpot).then(
            function(dataSpot){
                $scope.chartSeries = dataSpot;
                $localStorage.setObject('chartSeries-'+$stateParams.idSpot,dataSpot);
                //console.log("forecast :  "+ JSON.stringify(dataSpot));
            }),
            function(msg){
                console.log("Erreur ");
                $ionicPopup.alert({
                    title: 'Error',
                    template: msg
            });
        }
    }]);
