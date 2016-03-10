var angular = require('angular');
angular.module('RFID', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
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
    });
    $scope.createPersona = function(personaID) {
    $http.post('/api/v1/RFID', $scope.formData)
        .success(function(data) {
            $scope.formData = {};
            $scope.doc_id = data.doc_id;
            $scope.nombre = data.nom;
            $scope.genero = data.genero;
            $scope.correo = data.correo;
            $scope.tel = data.tel;
            $scope.cel = data.cel;
            $scope.cod_tarjeta = data.cod_tarjeta;
            $scope.cod_universidad = data.cod_universidad;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
};
