var angular = require('angular');
angular.module('RFID', [])

.controller('mainController', function($scope, $http) {
    $scope.master = {};
    $scope.persona = {};
    $scope.todoData = {};

    // Get all rfid
    $http.get('/api/v1/RFID')
        .success(function(data) {
            $scope.todoData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    $scope.createPersona = function(persona) {
        $http.post('/api/v1/RFID', $scope.persona)
            .success(function(data) {
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };
});
