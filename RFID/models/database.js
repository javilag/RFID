var pg = require('pg');
var conString = "postgres://postgres:password@localhost:5432/RFID";


//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
var client = new pg.Client(conString);
client.connect();
query.on('end', function() { client.end(); });
