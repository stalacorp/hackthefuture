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
    var mode;
    var origin = null;
    var dest;
    return {
        getLocs: function () {
            var pos = property.lastIndexOf(';');
            property = property.substring(0,pos) + property.substring(pos+1);
            return property.substring(0, property.length - 1);
        },
        setLocs: function(value) {
            property = value;
        },
        getMode: function(){
            return mode;
        },
        setMode: function(value){
            mode = value;
        },
        getOrigin: function(){
            return origin;
        },
        setOrigin: function(value){
            origin = value;
        },
        getDest: function(){
            return dest;
        },
        setDest: function(value){
            dest = value;
        }

    };
});

app.controller('PlanCtrl', ['$scope', '$resource', '$location','NgMap','sharedProperties',
    function($scope, $resource, $location, NgMap, sharedProperties){
        var startAddress, destAddress;

        NgMap.getMap().then(function(map) {
            map.setCenter({"lat":50.503887 , "lng": 4.469936});
            if (sharedProperties.getOrigin() !== null){
                $scope.origin = sharedProperties.getOrigin();
                $scope.dest = sharedProperties.getDest();
                $scope.travelMode = sharedProperties.getMode();
            }
            console.log(sharedProperties.getOrigin());

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
                    sharedProperties.setMode($scope.travelMode);
                    sharedProperties.setDest($scope.dest);
                    sharedProperties.setOrigin($scope.origin);
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

app.controller('CodeCtrl', ['$scope', '$resource', '$location', '$http','sharedProperties',
    function($scope, $resource, $location, $http, sharedProperties ){
        console.log("https://api.mapbox.com/v4/directions/mapbox." + sharedProperties.getMode().toLowerCase() + "/" + sharedProperties.getLocs() + ".json?access_token=pk.eyJ1IjoibWF0dGhpYXNzdGFsYSIsImEiOiJjaWhwenp0ZHUwNGVmdXJseHl3cGtvaXd2In0.5nwG6E6MITfDVGlyR3vSeg");

        $scope.url = "https://api.mapbox.com/v4/directions/mapbox." + sharedProperties.getMode().toLowerCase() + "/" + sharedProperties.getLocs() + ".json?access_token=pk.eyJ1IjoibWF0dGhpYXNzdGFsYSIsImEiOiJjaWhwenp0ZHUwNGVmdXJseHl3cGtvaXd2In0.5nwG6E6MITfDVGlyR3vSeg";

        var codes = [];

        $http.get($scope.url).then(function(r) {

            h = r.data.routes[0].steps[0].heading;

            r.data.routes[0].steps.forEach(function(step) {

                if (step.maneuver.type != "waypoint") {
                    if (h - step.heading < 0) {

                        codes.push('L');

                    } else if (h - step.heading > 10) {

                        codes.push('R');
                    } else {

                        codes.push('S');
                    }

                    h = step.heading;
                }


            });
            console.log(r.data);

            $scope.codes = codes;
        });


    }]);