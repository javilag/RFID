
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
          .then(function success(data) {
                $scope.personas  = {};
                $scope.personas  = data;
                console.log(data); //muestra todo el resultado de la consulta(status..) en el navegador. (result.data) solo el dato
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

//Pruebas con los json
//    $scope.showPerson = function() {
//      $http.get('/api/v1/RFID/showPerson')
//          .then(function success(data){
//              $scope.cargaPersona  = data;
//              console.log(data);
//          },
//          function error(error) {
//              console.log('Error: ' + error);
//          });
//    };

});
