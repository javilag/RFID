var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:password@localhost:5432/RFID";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/api/v1/RFID', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {doc_id: req.body.text,
      nom: req.body.text,
      genero: req.body.text,
      correo: req.body.text,
      tel: req.body.text,
      cel: req.body.text,
      cod_tarjeta: req.body.text,
      cod_universidad: req.body.text
      };

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        client.query("select ingresar_persona($1, $2, $3, $4, $5, $6, $7, $8)",
        [data.doc_id, data.nom, data.genero, data.correo, data.tel, data.cel, data.cod_tarjeta, data.cod_universidad]);
        // SQL Query > Insert Data
        //client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM personas");

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
