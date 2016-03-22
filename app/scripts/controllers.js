//'use strict';

var truc = angular.module('appliController', ['dataService'])

.controller('homeController', function($scope) {
})

.controller('lessthantenController', ['$scope','$window','lessthantenService', function($scope,$window,lessthantenService) {
    $scope.players = [];
	$scope.sortingEnabled = lessthantenService.sortingEnabled;

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
