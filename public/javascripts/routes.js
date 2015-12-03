var app = angular.module('Routes', ['ngResource', 'ngRoute']);

$(function() {

    alert('test');

});


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

        $scope.geolocate = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var geolocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var circle = new google.maps.Circle({
                        center: geolocation,
                        radius: position.coords.accuracy
                    });
                    autocomplete.setBounds(circle.getBounds());
                });
            }
        }




    }]);