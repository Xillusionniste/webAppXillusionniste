//'use strict';

var truc = angular.module('appliController', ['dataService'])

.controller('homeController', function($scope) {
})

.controller('lessthantenController', ['$scope','$window','lessthantenService', function($scope,$window,lessthantenService) {
    $scope.players = [];
	$scope.sortingEnabled = lessthantenService.sortingEnabled;
    $scope.showButtons = false;
    $scope.focusedPlayer = null;
    $scope.setSelected = function (focusedPlayer) {
        $scope.focusedPlayer = focusedPlayer;
        $scope.showButtons = true;
    };

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

    $scope.addPointsAll = function() {
        lessthantenService.addPointsAll();
	if ($scope.sortingEnabled) {$scope.sortPlayers();}
    };

    $scope.addPoints = function(index) {
        lessthantenService.addPoints(index);
	if ($scope.sortingEnabled) {$scope.sortPlayers();}
    };

    $scope.resetGame = function() {
        lessthantenService.resetGame();
    };

	$scope.sortPlayers = function() {
		lessthantenService.sortPlayers();
    };

    $scope.addZero = function(focusedPlayer){
        
        /*
        var newPoints = -1;
        var lastTotal;
        var total;
        var endReached = false;
        newPoints = 0;
        lastTotal               = players[i].points[1];
        total                   = +lastTotal + +newPoints;
        players[i].points[0]    = lastTotal;
        players[i].points[1]    = total;
        if (endReached) alert("200 Atteint !");
        */
    };

    $scope.addTwentyFive = function(focusedPlayer){
        lessthantenService.addTwentyFive();
        if ($scope.sortingEnabled) {$scope.sortPlayers();}
    };
    
    $scope.addFifty = function(focusedPlayer){
        var lastTotal;
        var endReached = false;
        var lastTotal = players[focusedPlayer].points[1];
        var total = +lastTotal + +50;
        players[focusedPlayer].points[0] = lastTotal;
        players[focusedPlayer].points[1] = total;
        if (endReached) alert("200 Atteint !");
        $scope.showButtons = false;
        $scope.focusedPlayer = null;
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
