laPoizWindApp.factory('AjaxServices',  function ($http, $q) {
    var factory = {
        spots : false,
        //function getSpots qui nous renverra nos differents spots
        getSpots : function(){
            var deferred = $q.defer();

            //$http.get('http://localhost/Wind/web/app_dev.php/json/spot/list')
            $http.get('http://www.lapoiz.com/Wind/web/app.php/json/spot/list')
                //si nous arrivons a récupérer les spots alors :
                .success(function(data, status){
                    factory.spots = data; // notre objets posts sera égal au fichier json(data)
                    // et on réenvois les spots
                    deferred.resolve(factory.spots);
                })
                // si nous y arrivons pas :
                .error(function(data, status){
                    //on réenvois un message d'erreur
                    console.warn("AjaxServices - Erreur returned: " + status );
                    deferred.reject('Impossible de récupérer les spots, ERROR 999 - coté serveur');
                });
            return deferred.promise; // return notre promesses
        },
        dataSpot : false,
        getDataSpot : function(idSpot){
            var deferred = $q.defer();
            try {
            //$http.get('http://localhost/Wind/web/app_dev.php/json/spot/'+idSpot)
            $http.get('http://www.lapoiz.com/Wind/web/app.php/json/spot/'+idSpot)
            //$http.get('test/json/test.json')
                .success(function(data, status){
                    factory.dataSpot = data;
                    deferred.resolve(factory.dataSpot);
                })
                .error(function(data, status){
                    console.log("Erreur returned: " + status );
                    deferred.reject('Impossible de récupérer le spot, ERROR 999 - coté serveur');
                });
            } catch (e) {
                console.warn("problem avec la requette ajax: " + e)
            }
            return deferred.promise;
        }
    }
    return factory;
})