
angular.module('RFID', [])

.controller('mainController', function($scope, $http) {
    $scope.persona = {};
    $scope.createPersona = function(persona) {
        $http.post('/api/v1/RFID', $scope.persona)
            .success(function(data) {
                $scope.persona  = {};
                $scope.persona  = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };
});
