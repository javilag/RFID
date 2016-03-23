
angular.module('RFID', [])

.controller('mainController', function($scope, $http) {
    $scope.persona = {};
    $scope.cargaPersona = {};
    $http.get('/api/v1/RFID')
        .success(function(data){
            $scope.cargaPersona  = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

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
    $scope.deletePersona = function(persona) {
    $http.delete('/api/v1/RFID', $scope.persona)
        .success(function(data) {
            $scope.persona  = {};
            $scope.persona  = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
};
});
