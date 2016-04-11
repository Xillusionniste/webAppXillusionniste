'use strict';

angular.module('buttonDirectives', [])
.directive("roleSelect", function() {
    return {
        templateUrl: "app/web/buttons/presidentRoleSelect.html",
        scope: {
            playerRole: "=",
            roleDisabled: "="
        },
        controller: function ($scope) {
            $scope.roleEnabledPaths = [
                "app/web/img/icons/ic_bug_report_white_18px.svg",
                "app/web/img/icons/ic_cancel_white_18px.svg",
                "app/web/img/icons/ic_clear_white_18px.svg",
                "app/web/img/icons/ic_do_not_disturb_white_18px.svg",
                "app/web/img/icons/ic_star_border_white_18px.svg",
                "app/web/img/icons/ic_stars_white_24px.svg",
                "app/web/img/icons/ic_school_white_18px.svg"
            ];
            $scope.roleDisabledPaths = [
                "app/web/img/icons/ic_bug_report_black_18px.svg",
                "app/web/img/icons/ic_cancel_black_18px.svg",
                "app/web/img/icons/ic_clear_black_18px.svg",
                "app/web/img/icons/ic_do_not_disturb_black_18px.svg",
                "app/web/img/icons/ic_star_border_black_18px.svg",
                "app/web/img/icons/ic_stars_black_24px.svg",
                "app/web/img/icons/ic_school_black_18px.svg"
            ];
        }
    };
})
.directive("trendIcon", function() {
    return {
        templateUrl: "app/web/buttons/trendIcon.html",
        scope: {
            playerTrend: "="
        },
        controller: function($scope) {
            $scope.trendPaths = [
                "app/web/img/icons/ic_trending_down_black_18px.svg",
                "app/web/img/icons/ic_trending_flat_black_18px.svg",
                "app/web/img/icons/ic_trending_up_black_18px.svg"
            ];
        }
    };
})
.directive("playerRowLessthanten", function(lessthantenService) {
    return {
        restrict : 'A',
        templateUrl : "app/web/templates/playerRowLessthanten.html",
        controller: function($scope){
            $scope.newPoints = null;
            $scope.focusedPlayer = null;
            $scope.currentPlayerName = null;

            $scope.setSelected = function (focusedPlayer) {
                //Only to simplify the code
                var showButtons = $scope.players[focusedPlayer].showButtons

                $scope.focusedPlayer = focusedPlayer;
                //Open the buttons for the selected player
                $scope.showCurrentPlayerButtons(focusedPlayer);
                //Set name to be displayed for adding points
                $scope.currentPlayerName = $scope.players[focusedPlayer].name;
                //Reset the points input field to be empty
                $scope.newPoints = null;
                //Reset focusedPlayer (also to remove row background color)
                if (showButtons === true) {$scope.focusedPlayer = null;}
            };

            $scope.addPoints = function() {            
                var index = $scope.focusedPlayer;
                var lastTotal;
                if (!isNaN($scope.newPoints) && ($scope.newPoints != null)) {
                    lastTotal = $scope.players[index].points;
                    var total = +lastTotal + $scope.newPoints;
                    $scope.newPoints = null;
                    $scope.players[index].points = total;
                    //lessthantenService.players = $scope.players;
                    $scope.showButtons = false;
                } else {
                    alert("Nombre non valide !");
                    $scope.newPoints = null;
                }
                //Hide points adding row        
                $scope.showCurrentPlayerButtons(index);
                lessthantenService.updateSortingEnabled(true);
            };


            $scope.addTwentyFive = function(){
                var index = $scope.focusedPlayer;
                var lastTotal = $scope.players[index].points;
                var total = +lastTotal + +25;
                $scope.players[index].points = total;
                $scope.showButtons = false;
                $scope.focusedPlayer = null;
                lessthantenService.players = $scope.players;
                //Hide points adding row 
                $scope.showCurrentPlayerButtons(index);
                lessthantenService.updateSortingEnabled(true);
                $scope.$parent.sortPlayers(true);
            };

            $scope.addFifty = function(focusedPlayer){
                var index = $scope.focusedPlayer;
                var lastTotal = $scope.players[index].points;
                var total = +lastTotal + +50;
                $scope.players[index].points = total;
                $scope.showButtons = false;
                $scope.focusedPlayer = null;
                lessthantenService.players = $scope.players;
                //Hide points adding row 
                $scope.showCurrentPlayerButtons(index);
                lessthantenService.updateSortingEnabled(true);
                $scope.$parent.sortPlayers(true);
            };

            $scope.$watch('focusedPlayer', function() { 
                lessthantenService.focusedPlayer = $scope.focusedPlayer;
            });
        }
    }
})
.directive("playerRowPresident", function(presidentService) {
    return {
        restrict : 'A',
        templateUrl : "app/web/templates/playerRowPresident.html",
        controller: function($scope){
            $scope.newPoints = null;
            $scope.focusedPlayer = null;
            $scope.currentPlayerName = null;

            $scope.setSelected = function (focusedPlayer) {
                //Only to simplify the code
                var showButtons = $scope.players[focusedPlayer].showButtons

                $scope.focusedPlayer = focusedPlayer;
                //Open the buttons for the selected player
                $scope.showCurrentPlayerButtons(focusedPlayer);
                //Set name to be displayed for adding points
                $scope.currentPlayerName = $scope.players[focusedPlayer].name;
                //Reset focusedPlayer (also to remove row background color)
                if (showButtons === true) {$scope.focusedPlayer = null;}
            };

            $scope.changeRole = function(data) {            
                var index = $scope.focusedPlayer;
                $scope.players[index].role = data;
                $scope.showButtons = false;
                //Hide points adding row        
                $scope.showCurrentPlayerButtons(index);
                presidentService.updateSortingEnabled(true);
            };

            $scope.$watch('focusedPlayer', function() { 
                presidentService.focusedPlayer = $scope.focusedPlayer;
            });
        }
    }
})
.directive("rowsScopa", function(scopaService) {
    return {
        restrict : 'A',
        templateUrl : "app/web/templates/rowsScopa.html"
    }
})
.directive("rowsScopa3", function(scopaService) {
    return {
        restrict : 'A',
        templateUrl : "app/web/templates/rowsScopa3.html"
    }
})
.directive("scopaCardsRow", function(scopaService) {
    return {
        templateUrl : "app/web/templates/scopaCardsRow.html"
    }
})
.directive("scopaDineroRow", function(scopaService) {
    return {
        templateUrl : "app/web/templates/scopaDineroRow.html"
    }
})
.directive("scopaPrimeriaRow", function(scopaService) {
    return {
        templateUrl : "app/web/templates/scopaPrimeriaRow.html"
    }
})
.directive("scopaScopaRow", function(scopaService) {
    return {
        templateUrl : "app/web/templates/scopaScopaRow.html"
    }
})
.directive("scopaSettebelloRow", function(scopaService) {
    return {
        templateUrl : "app/web/templates/scopaSettebelloRow.html"
    }
});
