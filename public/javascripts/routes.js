var app = angular.module('Routes', ['ngResource', 'ngRoute', 'ngMap', 'leaflet-directive']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'routes/address.html',
            controller: 'PlanCtrl'

        })
        .when('/code', {
            templateUrl: 'routes/code.html',
            controller: 'CodeCtrl'

        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('PlanCtrl', ['$scope', '$resource', '$location','NgMap',
    function($scope, $resource, $location, NgMap){
        var startAddress, destAddress;

        NgMap.getMap().then(function(map) {
            map.setCenter({"lat":50.503887 , "lng": 4.469936});



        });

        $scope.travelMode = "DRIVING";

        $scope.volgendeClick = function(){
            if (typeof($scope.map.directionsRenderers[0].directions) !== 'undefined'){
                console.log($scope.map.directionsRenderers[0].directions.routes[0]);
            }

        };

        $scope.startPlaceChanged = function() {
            startAddress = this.getPlace();
            console.log(
                startAddress.geometry.location.lat(),
                startAddress.geometry.location.lng()
            );
            $scope.origin = startAddress.formatted_address;
            console.log(startAddress.formatted_address);
        };



        $scope.destPlaceChanged = function() {
            destAddress = this.getPlace();
            console.log(
                destAddress.geometry.location.lat(),
                destAddress.geometry.location.lng()
            );
            $scope.dest = destAddress.formatted_address;
            console.log($scope.map.directions);
        };




    }]);

app.controller('CodeCtrl', ['$scope', '$resource', '$location', '$http',
    function($scope, $resource, $location, $http){

        $scope.url = "https://api.mapbox.com/v4/directions/mapbox.walking/4.938185,51.321722;4.946987,51.326390.json?access_token=pk.eyJ1IjoibWF0dGhpYXNzdGFsYSIsImEiOiJjaWhwenp0ZHUwNGVmdXJseHl3cGtvaXd2In0.5nwG6E6MITfDVGlyR3vSeg";

        var codes = [];

        $http.get($scope.url).then(function(r) {

            h = r.data.routes[0].steps[0].heading;

            r.data.routes[0].steps.forEach(function(step) {

                if (step.heading > h + 45) {

                    codes.push('R');

                } else if (step.heading < h - 45) {

                    codes.push('L');
                } else {

                    codes.push('S');
                }

            });
            console.log(r.data);

            $scope.codes = codes;
        });


    }]);