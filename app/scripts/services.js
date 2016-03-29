angular.module('dataService', [])
.service('lessthantenService', function($window){
    var players = [];
    var focusedPlayer = null;
    var sortingEnabled = false;

    var nameExists = function (x){
        var i = 0;
        while (i<players.length) {
            if (players[i].name == x) {
                return true;
            }
            if (i == players.length-1) {
                return false;
            } else i++;
        }
    };

    var averagePoints = function(){
        var averagePoints;
        var addition = 0;
        var playerLength = players.length;

        if (playerLength > 0) {
            for (var i=0; i<playerLength ; i++) {
                addition += players[i].points;
            }    
            averagePoints = Math.round(addition/playerLength);
        } else averagePoints = 0;
        
        return averagePoints;
    };


    return {
        getSize : function(){
            return players.length;
        },
        getPlayers : function(){
            return players;
        },
        addPlayerLessThanTen : function(newPlayer){
            if (!nameExists(newPlayer)) {
                var data =  {   name:   newPlayer,
                                points: averagePoints(),
                                showButtons: false,
                                trend : 0,
                                evolution: '+0',
                                lastIndex : -1
                            }
                players.push(data);
            } else alert(newPlayer.toUpperCase() + " existe deja !");
            sortingEnabled = true;
        },
        retreiveIndexes : function(){
            for (var i = 0; i<players.length; i++) {
                    players[i].lastIndex = i;
                }
        },
        removePlayer : function(index){
		var message = "Supprimer " + players[index].name + " ?";
            if($window.confirm(message)) {
                players.splice(index, 1);
            }
        },
        removeAllPlayers : function(){
            if (players.length != 0) {
            var message = "Supprimer tous les joueurs ?";
                if($window.confirm(message)) {
                    for (var i = players.length; i >=0 ; i--) {
                        players.splice(i, 1);
                    }
                }    
            }
        },
        resetGame : function(){
            if($window.confirm('Reset le jeu ?')) {
                for (var i = 0; i<players.length; i++) {
                    players[i].points = 0;
                    players[i].showButtons = false;
                    players[i].trend = 0;
                    players[i].evolution = '+0';
                }
            }
        },
    	sortPlayers : function() {
    		for (var i = players.length-1; i>=0; i--) {
    			var temp;
    			for (var j = 1; j <= i; j++) {
    				if (players[j-1].points > players[j].points) {
    					temp = players[j-1];
    					players[j-1] = players[j];
    					players[j] = temp;
    				}
    			}
    		}
            sortingEnabled = false;
    	},
        updateTrends : function() {
            for (var i = 0; i < players.length; i++) {
                if (i < players[i].lastIndex) {players[i].trend = 1;}
                else if (i == players[i].lastIndex) {players[i].trend = 0;}
                else {players[i].trend = -1;}
                players[i].evolution = players[i].lastIndex - i;
                if (players[i].evolution >= 0) {players[i].evolution = '+' + players[i].evolution;}
            }
        },
        checkForEnd : function() {
            for (var i = 0; i<players.length; i++) {
                if (players[i].points >= 200) {alert("200 Atteint !");}
            }
        },
        updateSortingEnabled : function(value){
            sortingEnabled = value;
        },
        getSortingEnabled : function(){
            return sortingEnabled;
        }
    }
})
.service('presidentService', function($window){
    var players = [];

    var nameExists = function (x){
        var i = 0;
        while (i<players.length) {
            if (players[i].name == x) {
                return true;
            }
            if (i == players.length-1) {
                return false;
            } else i++;
        }
    };

    return {
        getSize : function(){
            return players.length;
        },
        getPlayers : function(){
            return players;
        },
        addPlayerPresident : function(newPlayer){
            if (!nameExists(newPlayer)) {
                var data =  {   name:   newPlayer,
                                role: 2,
                                trend: 1
                            }
                players.push(data);
            } else alert(newPlayer.toUpperCase() + " existe déjà!");
        },
        removePlayer : function(index){
            if($window.confirm('Supprimer ce joueur ?')) {
                players.splice(index, 1);
            }
        },
        resetGame : function(){
            if($window.confirm('Reset le jeu ?')) {
                for (var i = 0; i<players.length; i++) {
                    players[i].role = 2;
                    players[i].trend = 1;
                }
            }
        }
    }
});
