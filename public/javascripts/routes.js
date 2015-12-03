var app = angular.module('Routes', ['ngResource', 'ngRoute', 'ngMap']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'routes/address.html',
            controller: 'PlanCtrl'

        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('PlanCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){

        var $scope = this;
        $scope.types = "['establishment']";
        $scope.placeChanged = function() {
            $scope.place = this.getPlace();
            console.log(
                $scope.place.geometry.location.lat(),
                $scope.place.geometry.location.lng()
            );
            $scope.map.setCenter($scope.place.geometry.location);
        }

    }]);