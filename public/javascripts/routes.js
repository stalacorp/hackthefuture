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
        .when('/code', {
            templateUrl: 'routes/code.html',
            controller: 'CodeCtrl'

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

app.controller('CodeCtrl', ['$scope', '$resource', '$location', '$http',
    function($scope, $resource, $location, $http){

        $scope.url = "https://api.mapbox.com/v4/directions/mapbox.walking/4.938185,51.321722;4.946987,51.326390.json?access_token=pk.eyJ1IjoibWF0dGhpYXNzdGFsYSIsImEiOiJjaWhwenp0ZHUwNGVmdXJseHl3cGtvaXd2In0.5nwG6E6MITfDVGlyR3vSeg";
        $scope.routes = [];

        $scope.add = function(){
            $http.get($scope.url).then(function(r) {
                $scope.routes = r.data;
                $scope.routes.push($scope.newMessage);
            });
        };

        response.routes[0].steps.forEach(function(step){

        });

    }]);