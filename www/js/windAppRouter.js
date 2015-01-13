'use strict';

laPoizWindApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'views/list.html',
            controller: 'ListCtrl'
        })
        .state('detail', {
            url: '/detail/:idSpot',
            templateUrl: 'views/detail.html',
            controller: 'DetailCtrl'
            /*
            resolve: {
                dataSpot: function($stateParams, AjaxServices) {
                    return AjaxServices.getDataSpot($stateParams.idSpot);
                }
            }
            */
        });

    $urlRouterProvider.otherwise("/");

})


//laPoizWindApp.config(["$routeProvider", function($routeProvider) {
//    $routeProvider.
//        when('/', {controller:'ListCtrl', templateUrl:'views/list.html'}).
//        when('/detail/:spotId', {controller:'DetailCtrl', templateUrl:'views/detail.html'}).
//        otherwise({redirectTo:'/'});
//}]);
