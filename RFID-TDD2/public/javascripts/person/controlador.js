angular.module('RFID', [])

.controller('mainController', function($scope, $http) {
    $scope.personas = {};   //---->¿PLURAL?
    $scope.cargaRegistro = {};
    $scope.cargaHora = {};
    $scope.cargPrograma = {};

//createPerson ingresa una persona nueva a la BD
    $scope.createPerson = function(persona) {
      if (persona == null) {
        alert("No se pudo ingresar persona, verifique los campos obligatorios nuevamente");
      }else{
        $http.post('/api/v1/RFID/createPerson', $scope.persona)//Este $scope.persona es el mismo de abajo?
            .then(function success(data) {
                if(data != null){
                  $scope.personas  = {};
                  $scope.personas  = data;
                  console.log(data);
                  alert("Se ingreso la persona exitosamente");

                }
              },
            function error(error) {
                  console.log('Error: ' + error);
            });
      }
    };

//getPerson obtiene la persona según su documento de identidad de la BD
    $scope.getPerson = function(persona) {
        $http.post('/api/v1/RFID/getPerson', $scope.persona)
          .then(function success(result) {
                $scope.personas  = {};
                $scope.personas  = result;
                console.log(result.data); //muestra todo el resultado de la consulta(status..) en el navegador. (result.data) solo el dato
            },
            function error(error) {
                console.log('Error: ' + error);
            });
    };

//post que permite enviar el serial de la tarjeta para ingresar un registro de la persona
    $scope.getInOut = function(persona) {
    $http.post('/api/v1/RFID/getInOut', $scope.persona)
      .then(function success(result) {
        $scope.cargaRegistro  = {};
        $scope.cargaRegistro  = result;
        console.log(result);
      },
      function error(error) {
        console.log('Error: ' + error);
      });
    };

//deletePerson elimina todos los registros asociados a la persona de la BD
    $scope.deletePerson = function(persona) {
      if(persona == null){
        alert("No se pudo eliminar persona, verifique el documento de identidad");
      }else{
      $http.post('/api/v1/RFID/deletePerson', $scope.persona)
        .then(function success(data) {
          if(data!=null){
            $scope.personas  = {};
            $scope.personas  = data;
            console.log(data);
            alert("Se elimino exitosamente la persona");
          }
        },
        function error(data) {
            console.log('Error: ' + data);
        });
      }
    };


    $scope.maxInHour = function() {
      $http.get('/api/v1/RFID/maxInHour')
          .then(function success(result){
              $scope.cargaHora  = result;
              console.log(result.data);
          },
          function error(error) {
              console.log('Error: ' + error);
          });
    };


    $scope.showPeoplexmonth = function(personas){
      $http.post('/api/v1/RFID/showPeople', $scope.personas)
          .then(function success(result) {
              $scope.cargPrograma = {};
              $scope.cargPrograma = result;
              console.log(result);
          },
          function error(data) {
              console.log('Error: ' + data);
          });
    };



//------------------------------------------ C  A  R  D ---------------------------------------
$scope.recordInOut = function(serial){
    $http.post('/api/v1/RFID/recordInOut', $scope.registro)
      .then( function success(result) {
        console.log(result.data);
      },
      function error(error) {
        console.log('Error: ' + error);
      });
};

});
