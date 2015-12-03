var app = angular.module('Routes', ['ngResource', 'ngRoute', 'ngMap', 'leaflet-directive']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'routes/address.html',
            controller: 'PlanCtrl'

        })
        .when('/map', {
            templateUrl: 'routes/map.html',
            controller: 'MapCtrl'

        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('PlanCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        var startAddress, destAddress;
        $scope.startPlaceChanged = function() {
            startAddress = this.getPlace();
            console.log(
                startAddress.geometry.location.lat(),
                startAddress.geometry.location.lng()
            );
            $scope.map.setCenter($scope.place.geometry.location);
        };

        $scope.destPlaceChanged = function() {
            destAddress = this.getPlace();
            console.log(
                destAddress.geometry.location.lat(),
                destAddress.geometry.location.lng()
            );
        };


    }]);

app.controller('MapCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){

    }]);