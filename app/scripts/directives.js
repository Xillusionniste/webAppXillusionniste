'use strict';

angular.module('buttonDirectives', [])
.directive("addPlayerButton", function() {
    return {
        templateUrl: "app/web/buttons/addPlayerButton.html"
    };
})
.directive("removePlayerButton", function() {
    return {
        templateUrl: "app/web/buttons/removePlayerButton.html"
    };
})
.directive("removeAllPlayersButton", function() {
    return {
        templateUrl: "app/web/buttons/removeAllPlayersButton.html"
    };
})
.directive("resetButton", function() {
    return {
        templateUrl: "app/web/buttons/resetButton.html"
    };
})
.directive("refreshDisabledButton", function() {
    return {
        templateUrl: "app/web/buttons/refreshDisabledButton.html"
    };
})
.directive("refreshEnabledButton", function() {
    return {
        templateUrl: "app/web/buttons/refreshEnabledButton.html"
    };
})
.directive("helpLessthantenButton", function() {
    return {
        templateUrl: "app/web/buttons/helpLessthantenButton.html"
    };
})
.directive("helpPresidentButton", function() {
    return {
        templateUrl: "app/web/buttons/helpPresidentButton.html"
    };
})
.directive("dummyButton", function() {
    return {
        templateUrl: "app/web/buttons/dummyButton.html"
    };
})
.directive("dummyButton2", function() {
    return {
        templateUrl: "app/web/buttons/dummyButton2.html"
    };
})
.directive("dummyButton3", function() {
    return {
        templateUrl: "app/web/buttons/dummyButton3.html"
    };
})
.directive("roleButton", function() {
    return {
        templateUrl: "app/web/buttons/roleButton.html"
    };
})
.directive("roleZero", function() {
    return {
        templateUrl: "app/web/buttons/roleZero.html"
    };
})
.directive("roleZeroDisabled", function() {
    return {
        templateUrl: "app/web/buttons/roleZeroDisabled.html"
    };
})
.directive("roleOne", function() {
    return {
        templateUrl: "app/web/buttons/roleOne.html"
    };
})
.directive("roleOneDisabled", function() {
    return {
        templateUrl: "app/web/buttons/roleOneDisabled.html"
    };
})
.directive("roleTwo", function() {
    return {
        templateUrl: "app/web/buttons/roleTwo.html"
    };
})
.directive("roleTwoDisabled", function() {
    return {
        templateUrl: "app/web/buttons/roleTwoDisabled.html"
    };
})
.directive("roleThree", function() {
    return {
        templateUrl: "app/web/buttons/roleThree.html"
    };
})
.directive("roleThreeDisabled", function() {
    return {
        templateUrl: "app/web/buttons/roleThreeDisabled.html"
    };
})
.directive("roleFour", function() {
    return {
        templateUrl: "app/web/buttons/roleFour.html"
    };
})
.directive("roleFourDisabled", function() {
    return {
        templateUrl: "app/web/buttons/roleFourDisabled.html"
    };
})
.directive("roleFive", function() {
    return {
        templateUrl: "app/web/buttons/roleFive.html"
    };
})
.directive("roleFiveDisabled", function() {
    return {
        templateUrl: "app/web/buttons/roleFiveDisabled.html"
    };
})
.directive("roleSix", function() {
    return {
        templateUrl: "app/web/buttons/roleSix.html"
    };
})
.directive("roleSixDisabled", function() {
    return {
        templateUrl: "app/web/buttons/roleSixDisabled.html"
    };
})
.directive("trendUpButton", function() {
    return {
        templateUrl: "app/web/buttons/trendUpButton.html"
    };
})
.directive("trendUpIcon", function() {
    return {
        templateUrl: "app/web/buttons/trendUpIcon.html"
    };
})
.directive("trendFlatIcon", function() {
    return {
        templateUrl: "app/web/buttons/trendFlatIcon.html"
    };
})
.directive("trendDownIcon", function() {
    return {
        templateUrl: "app/web/buttons/trendDownIcon.html"
    };
})
.directive("arrowDownIcon", function() {
    return {
        templateUrl: "app/web/buttons/arrowDownIcon.html"
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
}).directive("playerRowPresident", function(presidentService) {
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
});
