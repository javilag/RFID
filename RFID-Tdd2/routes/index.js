var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var personCtrl = require('../controllers/person/personController.js');


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/Ingreso', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'ingresoPersona.html'));
});
module.exports = router;

router.post('/api/v1/RFID/createPerson', personCtrl.createPerson);
