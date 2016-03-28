
angular.module('RFID', [])

.controller('mainController', function($scope, $http) {
    $scope.persona = {};
    $scope.cargaPersona = {};
    $scope.cargaRegistro = {};
    $http.get('/api/v1/RFID')
        .success(function(data){
            $scope.cargaPersona  = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    $http.get('/api/v1/RFID/rg')
        .success(function(data){
            $scope.cargaRegistro  = data;
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
    $http.post('/api/v1/RFID/delete', $scope.persona)
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
