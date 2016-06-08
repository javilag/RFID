var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var conString = require(path.join(__dirname, '../', '../', 'RFID-Tdd2/models/database.js'));


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/Ingreso', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'ingresoPersona.html'));
});
router.get('/Consultar', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'consultar.html'));
});
router.get('/Eliminar', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'eliminar.html'));
});

router.get('/Analisis', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'AnalisisDatos.html'));
});


module.exports = router;

router.post('/api/v1/RFID/createPerson', function(req, res){
  var results = [];
    // Grab data from http request
    var data = {
      doc_id: req.body.doc_id,
      nombre: req.body.nombre,
      genero: req.body.genero,
      correo: req.body.correo,
      programa: req.body.programa,
      tel: req.body.tel,
      cel: req.body.cel,
      cod_tarjeta: req.body.cod_tarjeta,
      cod_universidad: req.body.cod_universidad
    };

  // Get a Postgres client from the connection pool
  pg.connect(conString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query({
      text: "select ingresar_persona($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      values: [data.doc_id, data.nombre, data.genero, data.correo, data.tel, data.cel, data.cod_tarjeta, data.cod_universidad, data.programa]});
      // Stream results back one row at a time
      query.on('row', function(row) {
        results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
        done();
        return res.json(results);
      });

    });
});
