
laPoizWindApp.factory('$display', ['$window', '$ionicLoading', function($window, $ionicLoading) {
    return {
        showToast: function(message) {
            if ($window.plugins && $window.plugins.toast) {
                $window.plugins.toast.showShortCenter(message);
            }
            else $ionicLoading.show({ template: message, noBackdrop: true, duration: 2000 });
        }
    }
}]);
