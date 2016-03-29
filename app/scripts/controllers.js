//'use strict';

var truc = angular.module('appliController', ['dataService'])

.controller('HomeController', function($scope) {
})

.controller('LessthantenController', function($scope,$window,lessthantenService) {

    $scope.players = lessthantenService.getPlayersFromLocalSession();
    //console.log('Super Players');
    //console.log($scope.players);
    //$scope.players = [];
    $scope.sortingEnabled = true;

    $scope.addPlayerLessThanTen = function() {
        var newPlayer = prompt("Nouveau joueur : ");
        if (!newPlayer) {return;}
        lessthantenService.addPlayerLessThanTen(newPlayer);
        lessthantenService.sortPlayers();
        lessthantenService.retreiveIndexes();
        lessthantenService.pushDataIntoLocalSession();
    };

    $scope.removePlayer = function(index) {
        lessthantenService.removePlayer(index);
        lessthantenService.retreiveIndexes();
        lessthantenService.pushDataIntoLocalSession();
    };

    $scope.removeAllPlayers = function() {
        lessthantenService.removeAllPlayers();
        lessthantenService.pushDataIntoLocalSession();
    };

    $scope.sortPlayers = function(force) {
        if ($scope.sortingEnabled == true || force){
            lessthantenService.sortPlayers();
            lessthantenService.updateTrends();
            lessthantenService.retreiveIndexes();
            lessthantenService.checkForEnd();
            lessthantenService.pushDataIntoLocalSession();
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
        lessthantenService.pushDataIntoLocalSession();
    };

    $scope.resetGame = function() {
        lessthantenService.resetGame();
        lessthantenService.pushDataIntoLocalSession();
    };

    $scope.$watch(function(){return lessthantenService.getSize();},function(newVal){
        $scope.players = lessthantenService.getPlayers();
    });


    $scope.$watch(
        function(){return "<"+lessthantenService.getSortingEnabled()+">";},
        function(newVal){
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