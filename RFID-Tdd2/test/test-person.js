var chai = require ('chai'); // modulo chai
var chaiHttp = require ('chai-http'); // modulo chai-http para hacer peticiones.
var expect = require("chai").expect;
var app = require('../app');


chai.use(chaiHttp);

describe('Agregar persona: ', function(){
  it('Agregar una nueva persona');

    it('Que se agregue una nueva persona', function(done){
      chai.request(app).post('/api/v1/RFID/createPerson').send({

        "doc_id":'3454',
        "nombre":'omar',
        "genero":'masculino',
        "correo":'omarmartinez95@homtail.com',
        "tel":'3366213',
        "cel":'3046518850',
        "cod_tarjeta":'0099',
        "cod_universidad":'201337',
        "programa":'001'
        // poner todos  los datos del index.js
      }).end(function(error, res){
          expect(res.statusCode).to.be.equal(200);
        done();// Siempre finalizar con done
      });
    });
});
