angular.module('dataService', [])
.service('lessthantenService', function($window){
    var players = [];
    var saved = localStorage.getItem('players.lessthanten');
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
        getPlayersFromLocalSession : function(){
            players = (localStorage.getItem('players.lessthanten')!==null) ? 
                        JSON.parse(localStorage.getItem('players.lessthanten')) : [];
            return players;
        },
        pushDataIntoLocalSession : function(){
            localStorage.setItem('players.lessthanten', JSON.stringify(players));
        },
        addPlayer : function(newPlayer){
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
    var saved = localStorage.getItem('players.president');
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

    return {
        getSize : function(){
            return players.length;
        },
        getPlayers : function(){
            return players;
        },
        getPlayersFromLocalSession : function(){
            players = (localStorage.getItem('players.president')!==null) ? 
                        JSON.parse(localStorage.getItem('players.president')) : [];
            return players;
        },
        pushDataIntoLocalSession : function(){
            localStorage.setItem('players.president', JSON.stringify(players));
        },
        addPlayer : function(newPlayer){
            if (!nameExists(newPlayer)) {
                var data =  {   name: newPlayer,
                                role: 3,
                                showButtons: false,
                                trend : 0,
                                evolution: '+0',
                                lastIndex : -1
                            }
                players.push(data);
            } else alert(newPlayer.toUpperCase() + " existe deja !");
            sortingEnabled = true;
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
        retreiveIndexes : function(){
            for (var i = 0; i<players.length; i++) {
                    players[i].lastIndex = i;
                }
        },
        resetGame : function(){
            if($window.confirm('Reset le jeu ?')) {
                for (var i = 0; i<players.length; i++) {
                    players[i].role = 3;
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
                    if (players[j-1].role < players[j].role) {
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
        updateSortingEnabled : function(value){
            sortingEnabled = value;
        },
        getSortingEnabled : function(){
            return sortingEnabled;
        }
    }
})
.service('scopaService', function($window){
    var players = [];
    var saved = localStorage.getItem('players.scopa');
    var validateEnabled = false;
    var continueEnabled = false;
    var goals0 = [false,false,false,false,0];
    var goals1 = [false,false,false,false,0];

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
        getPlayers : function(){
            return players;
        },
        getPlayersFromLocalSession : function(){
            players = (localStorage.getItem('players.scopa')!==null) ? 
                        JSON.parse(localStorage.getItem('players.scopa')) : 
                        [
                            {
                                name: 'Joueur 1',
                                previousPoints: 0,
                                handPoints: 0,
                                totalPoints: 0
                            },
                            {
                                name: 'Joueur 2',
                                previousPoints: 0,
                                handPoints: 0,
                                totalPoints: 0
                            }
                        ];
            return players;
        },
        pushDataIntoLocalSession : function(){
            localStorage.setItem('players.scopa', JSON.stringify(players));
        },
        editPlayer : function(newPlayer, index){
            if (!nameExists(newPlayer)) {
                players[index].name = newPlayer;
            } else alert(newPlayer.toUpperCase() + " existe deja !");
        },
        resetGame : function(){
            if($window.confirm('Reset le jeu ?')) {
                for (var i = 0; i<players.length; i++) {
                    players[i].role = 3;
                    players[i].showButtons = false;
                    players[i].trend = 0;
                    players[i].evolution = '+0';
                }
            }
        },
        validate : function(){
            validateEnabled = false;
            var handPoints0 = 0;
            var handPoints1 = 0;
            
            //Calcul des points pour Joueur 0
            if (goals0[0]) {handPoints0++;}
            if (goals0[1]) {handPoints0++;}
            if (goals0[2]) {handPoints0++;}
            if (goals0[3]) {handPoints0++;}
            handPoints0 = handPoints0 + goals0[4];
            players[0].previousPoints = players[0].totalPoints;
            players[0].handPoints = handPoints0;
            players[0].totalPoints = players[0].totalPoints + players[0].handPoints;

            //Calcul des points pour Joueur 1
            if (goals1[0]) {handPoints1++;}
            if (goals1[1]) {handPoints1++;}
            if (goals1[2]) {handPoints1++;}
            if (goals1[3]) {handPoints0++;}
            handPoints1 = handPoints1 + goals1[4];
            players[1].previousPoints = players[1].totalPoints;
            players[1].handPoints = handPoints1;
            players[1].totalPoints = players[1].totalPoints + players[1].handPoints;

            for (var i = 0; i < 4; i++) {
                goals0[i] = goals1[i] = false;
            }
            goals0[4] = goals1[4] = 0;

        },
        continue : function(){

        },
        updateValidateEnabled : function(value){
            validateEnabled = value;
        },
        getValidateEnabled : function(){
            return validateEnabled;
        },
        updateContinueEnabled : function(value){
            continueEnabled = value;
        },
        getContinueEnabled : function(){
            return continueEnabled;
        },
        getGoals0 : function(){
            return goals0;
        },
        getGoals1 : function(){
            return goals1;
        },
        updateGoals : function(goals0_values, goals1_values){
            for (var i = 0; i < goals0.length; i++) {
                goals0[i] = goals0_values[i];
                goals1[i] = goals1_values[i];
            }
        }
    }
});