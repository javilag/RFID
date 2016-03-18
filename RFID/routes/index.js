var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:password@localhost:5432/RFID";
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

module.exports = router;

router.post('/api/v1/RFID', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {
      doc_id: req.body.doc_id,
      nom: req.body.nom,
      genero: req.body.genero,
      correo: req.body.correo,
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
        client.query("INSERT INTO persona(doc_id, nombre, genero, correo, tel, cel, cod_tarjeta, cod_universidad) values($1, $2, $3, $4, $5, $6, $7, $8)",
          [data.doc_id, data.nom, data.genero, data.correo, data.tel, data.cel, data.cod_tarjeta, data.cod_universidad]);
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM persona");

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
//curl --data "doc_id=1018218462&nom=false&genero=masc&correo=dfasf&tel=3653&cel=754&cod_tarjeta=5432&cod_universidad=875" http://127.0.0.1:3000/api/v1/RFID
