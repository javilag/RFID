var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:password@localhost:5432/RFID";
var path = require('path');


var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
//var portName = process.argv[2];

var myPort = new SerialPort("COM3",{
  baudRate:9600,
  parser:serialport.parsers.readline("\n")
})

myPort.on('open', onOpen);

function onOpen(){
  console.log("Open conectio&&&&&");
}

myPort.open(function () {
   myPort.on("data", function (data) {
     console.log("Por fin" +data); });
   }



    //Como que no está ejecutando

    //Intentar trasladar el post acá porque solo ejecuta una vez el post cuando se hace clic al boton del index y le esta llegando un Undefined
    //El archivo original de index.js es desktop/trin.txt
//Here i get code of target and is data
function onData(data){
  //console.log("On data0: " + data);
        function retornarFecha(){
          var fecha = new Date();
          var cadenaFecha=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+(fecha.getYear()-100);
          var cadenaHora=fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
          return cadenaFecha+ ' ' +cadenaHora;
        }

      var resFecha = retornarFecha();
      console.log(resFecha);

router.post('/api/v1/RFID/registroEnSa', function(req, res) {
      // Get a Postgres client from the connection pool


      pg.connect(conString, function(err, client, done) {
          // Handle connection errors
          if(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
          }

          var query = client.query({
               text: "select registro_persona($1, $2)",
               values: [data, resFecha]});

          query.on('row', function(row) {
                    results.push(row);
                  });

          query.on('end', function() {
              done();
              return res.json(results);
          });
      });
        //  console.log("On data: " + data);
});
}
