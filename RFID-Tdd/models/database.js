var pg = require('pg');
var path = require('path');
var conString = require(path.join(__dirname, '../', '../', 'configURL'));

var client = new pg.Client(conString);
client.connect();
query.on('end', function() { client.end(); });
