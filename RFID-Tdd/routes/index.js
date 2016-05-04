
var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var conString = require(path.join(__dirname, '../', '../', 'RFID-Tdd/models/database.js'));


//var connArduino = require('../models/conn-Arduino.js');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'main.html'));
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
  res.sendFile(path.join(__dirname, '../views', 'analisisDatos.html'));
});

module.exports = router;

  //post que envía la información del nuevo usuario
  router.post('/api/v1/RFID/createPerson', function(req, res) {
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

  //post que envía el doc_id para realizar la consulta de los datos de la persona
  router.post('/api/v1/RFID/getPerson', function(req, res) {
    var results = [];
    // Grab data from http request
    var data = {
      doc_id: req.body.doc_id};

      // Get a Postgres client from the connection pool
      pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query({
          text: "Select * FROM consultar_persona($1)",
          values: [data.doc_id]});

          // Stream results back one row at a time
          query.on('row', function(row, result) {
            result.addRow(row);
            //results.push(row);
            //console.log(result.rows[0]); //Muestra los datos en el servidor
            results = result.rows[0];
          });

          // After all data is returned, close connection and return results
          query.on('end', function() {
            done();
            console.log(res.json(results));
          });

      });
    });


    //post que envía el doc_id de la peronsa para consultar los registros asociados a la persona
    router.post('/api/v1/RFID/getInOut',function(req,res){
      var results = [];
          var data = {
            doc_id: req.body.doc_id};

            // Get a Postgres client from the connection pool
            pg.connect(conString, function(err, client, done) {
              // Handle connection errors
              if(err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err});
              }
              var query = client.query({
                text: "SELECT * FROM consultar_registros($1);",
                values: [data.doc_id]});

                // Stream results back one row at a time
              query.on('row', function(row) {
                //result.addRow(row);
                results.push(row);
                console.log(results);
                //results = result.rows;
              });

              // After all data is returned, close connection and return results
              query.on('end', function() {
                done();
                return res.json(results);
              });
            });
    });

    //post que envía el documento de identidad para eliminar todos los registros asociados a la persona
    router.post('/api/v1/RFID/deletePerson', function(req, res){
      var results =[];
      var data = {
        doc_id: req.body.doc_id};

      pg.connect(conString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
        }
        var query = client.query({
          text: "select eliminarpersona($1)",
          values: [data.doc_id]
        });
        query.on('row', function(row) {
          results.push(row);
        });
        query.on('end', function() {
          done();
          return res.json(results);
        });
      });
    });


    //get que permite realizar un reporte de las horas de mayor entrada a la universidad
    router.get('/api/v1/RFID/maxInHour',function(req,res){
      var results = [];
      pg.connect(conString, function(err, client, done) {
         if(err) {
            done();
            console.log(err);
         }
         var query = client.query("SELECT substr(hora,1,2) hora_repetida, COUNT(substr(hora,1,2)) maximo FROM registro_en_sa where tipo = 'ENTRADA'	GROUP BY hora_repetida ORDER BY maximo DESC LIMIT 3");
         query.on('row', function(row) {
            results.push(row);
         });
         query.on('end', function() {
            done();
            return res.json(results);
        });
     });
   });


   router.post('/api/v1/RFID/showPeople',function(req,res){
       var results = [];
       var data = {
         cod_programa: req.body.cod_programa,
         mes: req.body.mes
       };
       pg.connect(conString, function(err, client, done) {
          if(err) {
             done();
             console.log(err);
          }
          var query = client.query({
            text: "SELECT * FROM consultar_per_programaxmes($1,$2);",
            values: [data.cod_programa, data.mes]
          });
          query.on('row', function(row) {
             results.push(row);
             console.log(results);
          });
          query.on('end', function() {
             done();
             return res.json(results);
         });
       });
    });


  //var connArduino = require('../models/conn-Arduino.js');

   router.post('/api/v1/RFID/recordInOut', function(req, res){
     var results = [];

     //var serial = connArduino.serialValue;

     console.log("serial: " + serial);//Nunca se ejecuta

     pg.connect(conString, function(err, client, done) {
         // Handle connection errors
         if(err) {
           done();
           console.log(err);
           return res.status(500).json({ success: false, data: err});
         }

         var query = client.query({
              text: "select registro_persona($1)",
              values: [serial]
          });

         query.on('row', function(row) {
                   results.push(row);
                 });

         query.on('end', function() {
             done();
             return res.json(results);
         });
     });
     console.log('El serial en index: ' + serial);//Nunca se ejecuta
   });
