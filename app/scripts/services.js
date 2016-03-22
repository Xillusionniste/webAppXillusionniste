angular.module('dataService', [])
.service('lessthantenService', function($window){
    var players = [];
	var sortingEnabled = true;

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
                addition += players[i].points[1];
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
                                points: [0, averagePoints()]
                            }
                players.push(data);
            } else alert(newPlayer.toUpperCase() + " existe deja !");
        },
        removePlayer : function(index){
		var message = "Supprimer " + players[index].name + " ?";
            if($window.confirm(message)) {
                players.splice(index, 1);
            }
        },
        addPointsAll : function(){
            var newPoints = -1;
            var lastTotal;
            var total;
            var endReached = false;
            for (i=0; i<players.length; i++) {
                do {
                    if (isNaN(newPoints)) {
                        newPoints = prompt("VEUILLEZ ENTRER UN NOMBRE!!!\n" + "Points de " + players[i].name + " :");
                    } else {
                        newPoints = prompt("Points de " + players[i].name + " :");
                    }
                } while (!newPoints || isNaN(newPoints));
                lastTotal               = players[i].points[1];
                total                   = +lastTotal + +newPoints;
                players[i].points[0]    = lastTotal;
                players[i].points[1]    = total;
            }
            for (i=0; i<players.length; i++) {
                if (players[i].points[1] >= 200) {endReached = true;}
            }
            if (endReached) alert("200 Atteint !");
        },
        addPoints : function(index){
            var newPoints = -1;
            var lastTotal;
            var total;
            var endReached = false;
            do {
                if (isNaN(newPoints)) {
                    newPoints = prompt("VEUILLEZ ENTRER UN NOMBRE!!!\n" + "Points de " + players[index].name + " :" );
                } else {
                    newPoints = prompt("Points de " + players[index].name + " :" );
                }
            } while (isNaN(newPoints));
            lastTotal               = players[index].points[1];
            total                   = +lastTotal + +newPoints;
            players[index].points[0]    = lastTotal;
            players[index].points[1]    = total;
            if (players[index].points[1] >= 200) {endReached = true;}
            if (endReached) alert("200 Atteint !");
        },
        resetGame : function(){
            if($window.confirm('Reset le jeu ?')) {
                for (var i = 0; i<players.length; i++) {
                    players[i].points[0] = players[i].points[1] = 0;
                }
            }
        },
	
	sortPlayers : function() {
		for (var i = players.length-1; i>=0; i--) {
			var temp;
			for (var j=players.length-1; j>=0; j--) {
				if (players[j].points[1] < players[i].points[1]) {
					temp = players[j];
					players[j] = players[i];
					players[i] = temp;
				}
			}
		}
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
