var app = angular.module('Routes', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'routes/address.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);