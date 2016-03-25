//'use strict';

var truc = angular.module('appliController', ['dataService'])

.controller('HomeController', function($scope) {
})

.controller('LessthantenController', function($scope,$window,lessthantenService) {
    /*************************
    $scope.saved = localStorage.getItem('players');
    $scope.players = (localStorage.getItem('players')!==null) ? JSON.parse($scope.saved) : [ {text: 'Learn AngularJS', done: false}, {text: 'Build an Angular app', done: false} ];
    localStorage.setItem('players', JSON.stringify($scope.players));
    */
    //Dans une fonction qui watch les players :
    /*
    localStorage.setItem('todos', JSON.stringify($scope.todos));
    */
    /*************************/
    $scope.players = [];
    $scope.sortingEnabled = true;

    $scope.addPlayerLessThanTen = function() {
        var newPlayer = prompt("Nouveau joueur : ");
        if (!newPlayer) {return;}
        lessthantenService.addPlayerLessThanTen(newPlayer);
        lessthantenService.sortPlayers();
        lessthantenService.retreiveIndexes();
    };

    $scope.removePlayer = function(index) {
        lessthantenService.removePlayer(index);
        lessthantenService.retreiveIndexes();
    };

    $scope.sortPlayers = function(force) {
        if ($scope.sortingEnabled == true || force){
            lessthantenService.sortPlayers();
            lessthantenService.updateTrends();
            lessthantenService.retreiveIndexes();
            lessthantenService.checkForEnd();
        }
    };

    $scope.showCurrentPlayerButtons = function(player) {
        for (var i = 0; i<$scope.players.length ; i++ ) {
            if (i == player) {
                $scope.players[player].showButtons = !$scope.players[player].showButtons   
            } else {
                $scope.players[i].showButtons = false;
            }
        }
    };

    $scope.resetGame = function() {
        lessthantenService.resetGame();
    };

    $scope.$watch(function(){return lessthantenService.getSize();},function(newVal){
        console.log('WATCH: <players>');
        $scope.players = lessthantenService.getPlayers();
    });


    $scope.$watch(
        function(){return "<"+lessthantenService.getSortingEnabled()+">";},
        function(newVal){
            console.log('WATCH: <sortingEnabled>',newVal);
            $scope.sortingEnabled = lessthantenService.getSortingEnabled();
        }
    );

    /*********************************************
        IF VIEW CHANGED, CLOSE ALL THE PLAYER ROWS
    **********************************************/
    $scope.$on('$routeChangeStart', function() { 
        for (var i = 0 ; i<$scope.players.length; i++) {
            $scope.players[i].showButtons = false;
        }
     });


})
.controller('presidentController',function($scope,$window,presidentService) {
    $scope.players      = [];
    $scope.trendIcons    = [
        "app/web/img/icons/ic_trending_down_black_18px.svg",
        "app/web/img/icons/ic_trending_flat_black_18px.svg",
        "app/web/img/icons/ic_trending_up_black_18px.svg"
    ];

    $scope.addPlayerPresident = function() {
        var newPlayer = prompt("Nouveau joueur : ");
        if (!newPlayer) {return;}
        presidentService.addPlayerPresident(newPlayer);
    };

    $scope.$watch(function(){return presidentService.getSize();},function(newVal){
        $scope.players = presidentService.getPlayers();
    });

    $scope.removePlayer = function(index) {
        presidentService.removePlayer(index);
    };

    $scope.resetGame = function() {
        presidentService.resetGame();
    };
});