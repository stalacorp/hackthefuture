var app = angular.module('Routes', ['ngResource', 'ngRoute', 'ngMap']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'routes/index.html',
            controller: 'IndexCtrl'

        })
        .when('/address', {
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
app.controller('IndexCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){


    }]);

app.service('sharedProperties', function () {
    var property = 'Niks';
    return {
        getLocs: function () {
            return property;
        },
        setLocs: function(value) {
            property = value;
        }
    };
});

app.controller('PlanCtrl', ['$scope', '$resource', '$location','NgMap','sharedProperties',
    function($scope, $resource, $location, NgMap, sharedProperties){
        var startAddress, destAddress;

        NgMap.getMap().then(function(map) {
            map.setCenter({"lat":50.503887 , "lng": 4.469936});

        });

        $scope.travelMode = "DRIVING";

        $scope.volgendeClick = function(){
            $scope.error = null;
            var stepsString="";
            if (typeof($scope.map.directionsRenderers[0].directions) !== 'undefined'){
                if ($scope.map.directionsRenderers[0].directions.routes[0].legs[0].steps.length <= 25) {
                    $scope.map.directionsRenderers[0].directions.routes[0].legs[0].steps.forEach(function (step) {
                        stepsString += step.start_location.lng() + ',' + step.start_location.lat() + ';';
                    });
                    console.log(stepsString);
                    sharedProperties.setLocs(stepsString);
                    $location.path('/code');
                }else {
                    $scope.error = "Te lange route"
                }
            }else {
                $scope.error = "Onjuiste route";
            }

        };

        $scope.startPlaceChanged = function() {
            startAddress = this.getPlace();
            console.log(
                startAddress.geometry.location.lat(),
                startAddress.geometry.location.lng()
            );
            $scope.origin = startAddress.formatted_address;
        };



        $scope.destPlaceChanged = function() {
            destAddress = this.getPlace();
            console.log(
                destAddress.geometry.location.lat(),
                destAddress.geometry.location.lng()
            );
            $scope.dest = destAddress.formatted_address;
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