var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var serialValue;
//var portName = process.argv[2];

var myPort = new SerialPort("COM3",{
  baudRate:9600,
  parser:serialport.parsers.readline("\n")
})

myPort.on('open', onOpen);

function onOpen(){
  console.log("Open conection");
    myPort.on('data', onData);
  //var serial = onData(data);
}

function onData(data){
  //console.log("On data: " +data);
     serialValue = data;
     console.log('El serial es: '+serialValue);
     //module.exports = serialValue;
}



    //Intentar trasladar el post acá porque solo ejecuta una vez el post cuando se hace clic al boton del index y le esta llegando un Undefined
