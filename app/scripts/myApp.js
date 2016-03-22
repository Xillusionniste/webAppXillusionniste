//'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'appliController',
    'ngMaterial',
    'buttonDirectives'
])
.config(['$routeProvider', '$locationProvider',
    function($routeProvider,$locationProvider) {
        $routeProvider
        .when('/home', {
            templateUrl: 'app/partials/home.html',
            controller: 'homeController'
        })
        .when('/lessthanten', {
            templateUrl: 'app/partials/lessthanten.html',
            controller: 'lessthantenController'
        })
        .when('/lessthantenrules', {
            templateUrl: 'app/partials/lessthantenrules.html',
        })
        .when('/president', {
            templateUrl: 'app/partials/president.html',
            controller: 'presidentController'
        })
        .otherwise({
            redirectTo: '/home'
        });
        //$locationProvider.html5Mode(true);
    }
]);
