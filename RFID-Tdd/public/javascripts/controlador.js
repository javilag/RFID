
angular.module('RFID', [])

.controller('mainController', function($scope, $http) {
    $scope.persona = {};
    $scope.cargaPersona = {};
    $scope.cargaRegistro = {};

    $scope.obtenerDocId = function(persona) {
        $http.post('/api/v1/RFID/enviarId', $scope.persona)
            .success(function(data) {
                $scope.persona  = {};
                $scope.persona  = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };


//    $http.get('/api/v1/RFID/showPerson')
//        .success(function(data){
//            $scope.cargaPersona  = data;
//            console.log(data);
//        })
//        .error(function(error) {
//            console.log('Error: ' + error);
//        });

    $scope.createPersona = function(persona) {
        $http.post('/api/v1/RFID/create', $scope.persona)
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

//post de el registro de entrada y salida
      $scope.registroEnSa = function() {
      $http.post('/api/v1/RFID/searchInOut', $scope.registro)
      .success(function(data) {
        console.log(data);
      })
      .error(function(error) {
        console.log('Error: ' + error);
  });
};
});
