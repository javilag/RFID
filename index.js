var http = require('http');
var fs = require('fs');

http.createServer(function(request, response){
    response.writeHead(200);
    fs.readFile('form.html', function(error, data) {
    response.write(data);
    response.end();
  });
}).listen(8080);
console.log('listening on port 8080...');
