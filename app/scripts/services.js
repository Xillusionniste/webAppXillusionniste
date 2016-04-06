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
                                lastIndex : -1,
                                offsetWithPreviousPlayer: -1
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
            for (i = 0; i<players.length; i++) {
                if (i == 0) {
                    players[i].offsetWithPreviousPlayer = -1;
                } else {
                    players[i].offsetWithPreviousPlayer = players[i].points - players[i-1].points;
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
    var players;
    var saved = localStorage.getItem('players.scopa');
    var validateEnabled;
    var continueEnabled;
    var rematchEnabled;
    var goal; //false = 11 pts, else 21 pts
    var goals0;
    var goals1;
    var display0Won;
    var display1Won;

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
        getGoals0FromLocalSession : function(){
            goals0 = (localStorage.getItem('goals0.scopa')!==null) ? 
                        JSON.parse(localStorage.getItem('goals0.scopa')) : [false,false,false,false,0];
            return goals0;
        },
        getGoals1FromLocalSession : function(){
            goals1 = (localStorage.getItem('goals1.scopa')!==null) ? 
                        JSON.parse(localStorage.getItem('goals1.scopa')) : [false,false,false,false,0];
            return goals1;
        },
        getGoalFromLocalSession : function(){
            goals0 = (localStorage.getItem('goal.scopa')!==null) ? 
                        JSON.parse(localStorage.getItem('goal.scopa')) : false;
            return goals0;
        },
        getDisplay0WonFromLocalSession : function(){
            display0Won = (localStorage.getItem('display0Won.scopa')!==null) ? 
                        JSON.parse(localStorage.getItem('display0Won.scopa')) : false;
            return display0Won;
        },
        getDisplay1WonFromLocalSession : function(){
            display1Won = (localStorage.getItem('display1Won.scopa')!==null) ? 
                        JSON.parse(localStorage.getItem('display1Won.scopa')) : false;
            return display1Won;
        },
        getValidateEnabledFromLocalSession : function(){
            validateEnabled = (localStorage.getItem('validateEnabled.scopa')!==null) ? 
                        JSON.parse(localStorage.getItem('validateEnabled.scopa')) : false;
            return validateEnabled;
        },
        getContinueEnabledFromLocalSession : function(){
            continueEnabled = (localStorage.getItem('continueEnabled.scopa')!==null) ? 
                        JSON.parse(localStorage.getItem('continueEnabled.scopa')) : false;
            return continueEnabled;
        },
        getRematchEnabledFromLocalSession : function(){
            rematchEnabled = (localStorage.getItem('rematchEnabled.scopa')!==null) ? 
                        JSON.parse(localStorage.getItem('rematchEnabled.scopa')) : false;
            return rematchEnabled;
        },
        pushDataIntoLocalSession : function(){
            localStorage.setItem('players.scopa', JSON.stringify(players));
            localStorage.setItem('goals0.scopa', JSON.stringify(goals0));
            localStorage.setItem('goals1.scopa', JSON.stringify(goals1));
            localStorage.setItem('goal.scopa', JSON.stringify(goal));
            localStorage.setItem('display0Won.scopa', JSON.stringify(display0Won));
            localStorage.setItem('display1Won.scopa', JSON.stringify(display1Won));
            localStorage.setItem('validateEnabled.scopa', JSON.stringify(validateEnabled));
            localStorage.setItem('continueEnabled.scopa', JSON.stringify(continueEnabled));
            localStorage.setItem('rematchEnabled.scopa', JSON.stringify(rematchEnabled));
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
        checkForEnd : function() {
            var goalPoints;
            if (!goal) {goalPoints = 11;}
            else goalPoints = 21;

            if ((players[0].totalPoints >= goalPoints) && (players[0].totalPoints > players[1].totalPoints)) {
                display0Won = true;
                rematchEnabled = true;
                continueEnabled = false;
            }
            if ((players[1].totalPoints >= goalPoints) && (players[1].totalPoints > players[0].totalPoints)) {
                display1Won = true;
                rematchEnabled = true;
                continueEnabled = false;
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
            if (goals1[3]) {handPoints1++;}
            handPoints1 = handPoints1 + goals1[4];
            players[1].previousPoints = players[1].totalPoints;
            players[1].handPoints = handPoints1;
            players[1].totalPoints = players[1].totalPoints + players[1].handPoints;

            continueEnabled = true;

        },
        continue : function(){
            continueEnabled = false;
            for (var i = 0; i < 4; i++) {
                goals0[i] = goals1[i] = false;
            }
            goals0[4] = goals1[4] = 0;
        },
        resetGame : function(mode){
            console.log(mode);
            var sentence = ["Reset le jeu ?", "Rejouer ?"];
            if($window.confirm(sentence[mode])) {
                for (var i = 0; i<players.length; i++) {
                    players[i].previousPoints = players[i].handPoints = players[i].totalPoints = 0;
                }
                for (var i = 0; i < 4; i++) {
                    goals0[i] = goals1[i] = false;
                }
                goals0[4] = goals1[4] = 0;
                continueEnabled = false;
                validateEnabled = false;
                display0Won = false;
                display1Won = false;
                rematchEnabled = false;
            }

        },
        addScopa : function(index){
            if (!continueEnabled) {
                if (index == 0) {
                    goals0[4]++;
                    validateEnabled = true;
                }
                else if (index == 1) {
                    goals1[4]++;
                    validateEnabled = true;
                }    
            } else {
                alert("Cliquer sur Continuer !");
            }
        },
        removeScopa : function(index){
            if (!continueEnabled) {
                if (index == 0) {
                    goals0[4]--;
                    validateEnabled = true;
                }
                else if (index == 1) {
                    goals1[4]--;
                    validateEnabled = true;
                } 
            } else {
                alert("Cliquer sur Continuer !");
            }
        },
        updateValidateEnabled : function(player_index, goal_item){
            if (!continueEnabled) {
                validateEnabled = true;
                if (player_index == 0) {
                    if (!goals0[goal_item] && goals1[goal_item]) {
                        goals1[goal_item] = false;
                    }
                }
                if (player_index == 1) {
                    if (!goals1[goal_item] && goals0[goal_item]) {
                        goals0[goal_item] = false;
                    }
                }
            } else {
                alert("Cliquer sur Continuer !");
                if (player_index == 0){
                    goals0[goal_item] = !goals0[goal_item];
                }
                else if (player_index == 1){
                    goals1[goal_item] = !goals1[goal_item];
                }
            }
        },
        getValidateEnabled : function(){
            return validateEnabled;
        },
        getRematchEnabled : function(){
            return rematchEnabled;
        },
        updateRematchEnabled : function(value){
            rematchEnabled = value;
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
        getDisplay0Won : function(){
            return display0Won;
        },
        getDisplay1Won : function(){
            return display1Won;
        },
        updateGoals : function(goals0_values, goals1_values){
            for (var i = 0; i < goals0.length; i++) {
                goals0[i] = goals0_values[i];
                goals1[i] = goals1_values[i];
            }
        },
        updateGoal : function(value){
            goal = value;
        }
    }
});