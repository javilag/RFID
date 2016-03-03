var pg = require('pg');
var conString = "postgres://postgres:macbook13@localhost:5432/RFID";
var pgproc = require('pgproc')

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: 1
  });
  pgproc = my_stored_procedure('call ingresar_persona("3234","patience","fem","lol@lmao","98769","3413","3124","1234")', 
    function(rows) { 
      console.log(rows); 
    });
  //client.query('CALL ingresar_persona("3234","patience","fem","lol@lmao","2345","3413","3124","1234")', 
    //function(err,result){
      //if(err) {
        //return console.error('error running query', err);
      //}
      //console.log('Data received from Db');
  //});
});
