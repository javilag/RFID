
angular.module('RFID', [])

.controller('mainController', function($scope, $http) {
    $scope.personas = {};   //---->¿PLURAL?
//    $scope.cargaPersona = {};
//    $scope.cargaRegistro = {};

//createPerson ingresa una persona nueva a la BD
    $scope.createPerson = function(persona) {
        $http.post('/api/v1/RFID/createPerson', $scope.persona)//Este $scope.persona es el mismo de abajo?
            .then(function success(data) {
                $scope.personas  = {};
                $scope.personas  = data;
                console.log(data);
            },
            function error(error) {
                console.log('Error: ' + error);
            });
    };

//getPerson obtiene la persona según su documento de identidad de la BD
    $scope.getPerson = function(persona) {
        $http.post('/api/v1/RFID/getPerson', $scope.persona)
          .then(function success(result) {
                $scope.personas  = {};
                $scope.personas  = result.data;
                console.log(result); //retorna todo el resultado de la consulta, con estatus y todo eso. (result.data) solo el dato
            },
            function error(error) {
                console.log('Error: ' + error);
            });
    };

//post que permite enviar el serial de la tarjeta para ingresar un registro de la persona
    $scope.recordInOut = function(persona) {
    $http.post('/api/v1/RFID/recordInOut', $scope.registro)
      .then(function success(data) {
        console.log(data);
      },
      function error(error) {
        console.log('Error: ' + error);
      });
    };

//deletePerson elimina todos los registros asociados a la persona de la BD
    $scope.deletePerson = function(persona) {
    $http.post('/api/v1/RFID/deletePerson', $scope.persona)
        .then(function success(data) {
            $scope.personas  = {};
            $scope.personas  = data;
            console.log(data);
        },
        function error(data) {
            console.log('Error: ' + data);
        });
    };

});

//    $http.get('/api/v1/RFID/showPerson')
//        .success(function(data){
//            $scope.cargaPersona  = data;
//            console.log(data);
//        })
//        .error(function(error) {
//            console.log('Error: ' + error);
//        });
