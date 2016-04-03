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
            controller: 'HomeController'
        })
        .when('/lessthanten', {
            templateUrl: 'app/partials/lessthanten.html',
            controller: 'LessthantenController'
        })
        .when('/lessthantenhelp', {
            templateUrl: 'app/partials/lessthantenhelp.html'
        })
        .when('/lessthantenbuttons', {
            templateUrl: 'app/partials/lessthantenbuttons.html'
        })
        .when('/lessthantenrules', {
            templateUrl: 'app/partials/lessthantenrules.html',
        })
        .when('/president', {
            templateUrl: 'app/partials/president.html',
            controller: 'PresidentController'
        })
        .when('/presidenthelp', {
            templateUrl: 'app/partials/presidenthelp.html'
        })
        .when('/presidentbuttons', {
            templateUrl: 'app/partials/presidentbuttons.html'
        })
        .when('/presidentrules', {
            templateUrl: 'app/partials/presidentrules.html',
        })
        .when('/presidentroles', {
            templateUrl: 'app/partials/presidentroles.html',
        })
        .when('/scopa', {
            templateUrl: 'app/partials/scopa.html',
            controller: 'ScopaController'
        })
        .when('/scopahelp', {
            templateUrl: 'app/partials/scopahelp.html'
        })
        .when('/scopabuttons', {
            templateUrl: 'app/partials/scopabuttons.html'
        })
        .when('/scoparules', {
            templateUrl: 'app/partials/scoparules.html',
        })
        .when('/scopaprimera', {
            templateUrl: 'app/partials/scopaprimera.html',
        })
        .otherwise({
            redirectTo: '/home'
        });
        //$locationProvider.html5Mode(true);
    }
]);
