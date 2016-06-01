
var expect = require("chai").expect;
var personCtrl = require("../controllers/person/personController");
var httpMocks = require('node-mocks-http');

describe("Person tests", function(){
  it('Debe enviar los datos de la persona', function(done){
    var res = httpMocks.createResponse();
    var req = httpMocks.createRequest({
      body : {//: o = -->Documentacion HTTPMOCKS
        doc: '1037638826',
        nombre: 'Juan Jose',
        genero : 'Masculino',
        correo : 'correo',
        tel : '3336213',
        cel : '3046516645',
        cod_tarjeta : '0001',
        cod_universidad : '201217021010'
      }
    });

    personCtrl.createPerson(req, res); //Define el callback
      console.log(req.body);
      expect(res.statusCode).to.be.equal(200);
      expect(req.body.doc).to.be.a("String").and.not.equal("");
      expect(req.body.nombre).to.be.a("String").and.not.equal("");
      expect(req.body.genero).to.be.a("String").and.not.equal("");
      expect(req.body.correo).to.be.a("String").and.not.equal("");
      expect(req.body.tel).to.be.a("String").and.not.equal("");
      expect(req.body.cel).to.be.a("String").and.not.equal("");
      expect(req.body.cod_tarjeta).to.be.a("String").and.not.equal("");
      expect(req.body.cod_universidad).to.be.a("String").and.not.equal("");
      //NO ESTÁ GUARDANDO
      //expect(res.) estado de que guardó
      done();


  });

});
