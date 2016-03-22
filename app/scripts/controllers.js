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
    };
    $scope.currentPlayerName = null;
    $scope.newPoints = -1;

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

    $scope.addZero = function(){
        $scope.showPointsInput = true;
        var index = $scope.focusedPlayer;
        var endReached = false;
        var lastTotal = -1;
        var total = -1;
        for (var i=0; i<players.length ; i++) {
            if (i != $scope.focusedPlayer) {
                $scope.currentPlayerName = $scope.players[i].name;
                lastTotal = $scope.players[i].points[1];
                while(!$scope.addPointsButtonClicked){}

                total = +lastTotal + $scope.newPoints;
                $scope.players[i].points[0] = lastTotal;
                $scope.players[i].points[1] = total;
                $scope.addPointsButtonClicked = false;
            }
        }   

        $scope.showPointsInput = false;
        $scope.showButtons = false;
        $scope.focusedPlayer = null;

        for (i=0; i<$scope.players.length; i++) {
                if ($scope.players[i].points[1] >= 200) {endReached = true;}
        }

        if (endReached) alert("200 Atteint !");
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
