//'use strict';

var truc = angular.module('appliController', ['dataService'])

.controller('homeController', function($scope) {
})

.controller('lessthantenController', ['$scope','$window','lessthantenService', function($scope,$window,lessthantenService) {
    $scope.players = [];
	$scope.sortingEnabled = lessthantenService.sortingEnabled;
    $scope.showButtons = false;
    $scope.showPointsInput = false;
    $scope.addPointsButtonClicked = false;
    $scope.focusedPlayer = null;
    $scope.setSelected = function (focusedPlayer) {
        $scope.focusedPlayer = focusedPlayer;
        $scope.showButtons = true;
        $scope.currentPlayerName = $scope.players[focusedPlayer].name;
        $scope.newPoints = null;
    };
    $scope.currentPlayerName = null;
    $scope.newPoints = null;

    $scope.addPlayerLessThanTen = function() {
        var newPlayer = prompt("Nouveau joueur : ");
        if (!newPlayer) {return;}
        lessthantenService.addPlayerLessThanTen(newPlayer);
	if ($scope.sortingEnabled) {$scope.sortPlayers();}
    };

    $scope.$watch(function(){return lessthantenService.getSize();},function(newVal){
        $scope.players = lessthantenService.getPlayers();
    });

    $scope.$watch('sortingEnabled', function() {
    if ($scope.sortingEnabled) {$scope.sortPlayers();} 
    lessthantenService.sortingEnabled = $scope.sortingEnabled;
    });

    $scope.removePlayer = function(index) {
        lessthantenService.removePlayer(index);
    };
    
    $scope.sortPlayers = function() {
        lessthantenService.sortPlayers();
    };

    $scope.addPoints = function() {
        var index = $scope.focusedPlayer;
        var endReached = false;
        var lastTotal = $scope.players[index].points[1];
        var total = +lastTotal + $scope.newPoints;
        $scope.newPoints = null;

        $scope.players[index].points[0] = lastTotal;
        $scope.players[index].points[1] = total;

        if ($scope.players[index].points[1] >= 200) {endReached = true;}
        if (endReached) alert("200 Atteint !");

        lessthantenService.players = $scope.players;
    };

     $scope.addFifty = function(focusedPlayer){
        var index = $scope.focusedPlayer;
        var endReached = false;
        var lastTotal = $scope.players[index].points[1];
        var total = +lastTotal + +50;
        $scope.players[index].points[0] = lastTotal;
        $scope.players[index].points[1] = total;
        if ($scope.players[index].points[1] >= 200) {endReached = true;}
        if (endReached) alert("200 Atteint !");
        $scope.showButtons = false;
        $scope.focusedPlayer = null;
        lessthantenService.players = $scope.players;
        if ($scope.sortingEnabled) {$scope.sortPlayers();}
    };

    $scope.addTwentyFive = function(){
        var index = $scope.focusedPlayer;
        var endReached = false;
        var lastTotal = $scope.players[index].points[1];
        var total = +lastTotal + +25;
        $scope.players[index].points[0] = lastTotal;
        $scope.players[index].points[1] = total;
        if ($scope.players[index].points[1] >= 200) {endReached = true;}
        if (endReached) alert("200 Atteint !");
        $scope.showButtons = false;
        $scope.focusedPlayer = null;
        lessthantenService.players = $scope.players;
        if ($scope.sortingEnabled) {$scope.sortPlayers();}
    };

    $scope.addingFinished = function() {
        if ($scope.sortingEnabled) {$scope.sortPlayers();}
        $scope.showButtons = false;
        $scope.focusedPlayer = null;
    };

    $scope.resetGame = function() {
        lessthantenService.resetGame();
    };
}])
.controller('presidentController', ['$scope','$window','presidentService', function($scope,$window,presidentService) {
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

}]);
