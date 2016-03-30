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

    $scope.addPlayer = function() {
        var newPlayer = prompt("Nouveau joueur : ");
        if (!newPlayer) {return;}
        lessthantenService.addPlayer(newPlayer);
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
    $scope.players = presidentService.getPlayersFromLocalSession();
    $scope.sortingEnabled = true;

    $scope.addPlayer = function() {
        var newPlayer = prompt("Nouveau joueur : ");
        if (!newPlayer) {return;}
        presidentService.addPlayer(newPlayer);
        presidentService.sortPlayers();
        presidentService.retreiveIndexes();
        presidentService.pushDataIntoLocalSession();
    };

    $scope.removePlayer = function(index) {
        presidentService.removePlayer(index);
        presidentService.retreiveIndexes();
        presidentService.pushDataIntoLocalSession();
    };

    $scope.removeAllPlayers = function() {
        presidentService.removeAllPlayers();
        presidentService.pushDataIntoLocalSession();
    };

    $scope.sortPlayers = function(force) {
        if ($scope.sortingEnabled == true || force){
            presidentService.sortPlayers();
            presidentService.updateTrends();
            presidentService.retreiveIndexes();
            presidentService.pushDataIntoLocalSession();
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
        presidentService.pushDataIntoLocalSession();
    };

    $scope.resetGame = function() {
        presidentService.resetGame();
        presidentService.pushDataIntoLocalSession();
    };

    $scope.showRanking = function() {
        alert('*RAPPEL* \nOrdre des places :\n\n' +
            '1. (Empereur)\n' +
            '2. Pr\351sident\n' +
            '3. Vice-Pr\351sident\n' +
            '4. Neutre\n' +
            '5. Vice-Trouduc\n' +
            '6. Trouduc\n' +
            '7. (Cloporte)');
    };

    $scope.$watch(function(){return presidentService.getSize();},function(newVal){
        $scope.players = presidentService.getPlayers();
    });

    $scope.$watch(
        function(){return "<"+presidentService.getSortingEnabled()+">";},
        function(newVal){
            $scope.sortingEnabled = presidentService.getSortingEnabled();
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
});
