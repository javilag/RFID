var chai = require ('chai'); // modulo chai
var chaiHttp = require ('chai-http'); // modulo chai-http para hacer peticiones.
var should = chai.should(); // utilizar should
var app = require('../app');


chai.use(chaiHttp);

describe('Nueva persona', function(){
  it('Agregar una nueva persona');
});

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
    res.should.have.status(200);
    done();// Siempre finalizar con done
  });
});

describe ('Eliminar persona', function(){
  it('Eliminar la persona asociada a este documento')
});

it('Que se elimine la persona', function(done){
  chai.request(app).post('/api/v1/RFID/deletePerson').send({

    "doc_id":'3454'

    // poner todos  los datos del index.js
  }).end(function(error, res){
    res.should.have.status(200);
    done();// Siempre finalizar con done
  });
});

// falta TDD para el consultar persona.
describe ('Consultar persona', function(){
  it('Consultar la persona asociada a este documento')
});

it('Que se consulte la persona', function(done){
  chai.request(app).post('/api/v1/RFID/getPerson').send({

    "doc_id":'1037638826'

    // poner todos  los datos del index.js
  }).end(function(error, res){
    res.should.have.status(200);
    done();// Siempre finalizar con done
  });
});

// TDD para la conexión.
