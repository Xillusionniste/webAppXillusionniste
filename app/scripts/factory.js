app.factory('lessthantenFactory', ['$rootScope', function ($rootScope) {

    var service = {

        players: {
            name: '',
            points: []
        },

        SaveState: function () {
            sessionStorage.userService = angular.toJson(service.players);
        },

        RestoreState: function () {
            service.players = angular.fromJson(sessionStorage.userService);
        }
    }

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
}]);