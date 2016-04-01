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
.controller('PresidentController',function($scope,$window,presidentService) {
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
})
.controller('ScopaController',function($scope,$window,scopaService) {   

    $scope.players =            scopaService.getPlayersFromLocalSession();
    $scope.validateEnabled =    scopaService.getValidateEnabledFromLocalSession();
    $scope.continueEnabled =    scopaService.getContinueEnabledFromLocalSession();
    $scope.rematchEnabled =     scopaService.getRematchEnabledFromLocalSession();
    $scope.goal =               scopaService.getGoalFromLocalSession(); //false = 11 pts, else 21 pts
    $scope.goals0 =             scopaService.getGoals0FromLocalSession();
    $scope.goals1 =             scopaService.getGoals1FromLocalSession();
    $scope.display0Won =        scopaService.getDisplay0WonFromLocalSession();
    $scope.display1Won =        scopaService.getDisplay1WonFromLocalSession();

    $scope.editPlayer = function(index) {
        var newPlayer = prompt("Nom du joueur : ");
        if (!newPlayer) {return;}
        scopaService.editPlayer(newPlayer,index);
        scopaService.pushDataIntoLocalSession();
    };

    $scope.validate = function() {
        $scope.updateGoals();
        scopaService.validate();
        scopaService.checkForEnd();
        scopaService.pushDataIntoLocalSession();
    };

    $scope.continue = function() {
        scopaService.continue();
        scopaService.pushDataIntoLocalSession();
    };

    $scope.updateGoals = function() {
        scopaService.updateGoals($scope.goals0, $scope.goals1);
        scopaService.pushDataIntoLocalSession();
    };

    $scope.updateGoal = function() {
        scopaService.updateGoal();
        scopaService.pushDataIntoLocalSession();
    };

    $scope.updateValidateEnabled = function(player_index, goal_item) {
        scopaService.updateValidateEnabled(player_index, goal_item);
        scopaService.pushDataIntoLocalSession();
    };

    $scope.updateContinueEnabled = function() {
        scopaService.updateContinueEnabled(true);
        scopaService.pushDataIntoLocalSession();
    };

    $scope.resetGame = function() {
        scopaService.resetGame();
        scopaService.pushDataIntoLocalSession();
    };

    $scope.showRanking = function() {
        alert(  'Valeurs pour la Primera :\n\n' +
                '7 (21 pts)\n' +
                '6 (18 pts)\n' +
                '1 (16 pts)\n' +
                '5 (15 pts)\n' +
                '4 (14 pts)\n' +
                '3 (13 pts)\n' +
                '2 (12 pts)\n' +
                'Tetes (10 pts)\n');
    };

    $scope.addScopa = function(index) {
        scopaService.addScopa(index);
        scopaService.pushDataIntoLocalSession();
    };

    $scope.removeScopa = function(index) {
        scopaService.removeScopa(index);
        scopaService.pushDataIntoLocalSession();
    };

    $scope.$watch(
        function(){return "<"+scopaService.getValidateEnabled()+">";},
        function(newVal){
            $scope.validateEnabled = scopaService.getValidateEnabled();
        }
    );

    $scope.$watch(
        function(){return "<"+scopaService.getContinueEnabled()+">";},
        function(newVal){
            $scope.continueEnabled = scopaService.getContinueEnabled();
        }
    );

    $scope.$watch(
        function(){return "<"+scopaService.getRematchEnabled()+">";},
        function(newVal){
            $scope.rematchEnabled = scopaService.getRematchEnabled();
        }
    );

    $scope.$watch(
        function(){return scopaService.getGoals0();},
        function(newVal){
            $scope.goals0 = scopaService.getGoals0();
        }
    );

    $scope.$watch("goal",
        function(newValue, oldValue){
            scopaService.updateGoal($scope.goal);
            scopaService.pushDataIntoLocalSession();
        }
    );

    $scope.$watch(
        function(){return scopaService.getGoals1();},
        function(newVal){
            $scope.goals1 = scopaService.getGoals1();
        }
    );

    $scope.$watch(
        function(){return scopaService.getDisplay0Won();},
        function(newVal){
            $scope.display0Won = scopaService.getDisplay0Won();
        }
    );

    $scope.$watch(
        function(){return scopaService.getDisplay1Won();},
        function(newVal){
            $scope.display1Won = scopaService.getDisplay1Won();
        }
    );

    
});
