var http = require('http');
var url = require('url');

function start(handle, route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Request for \"' + pathname + '\" received.');
    route(handle, pathname, response);
  }

  var port = process.env.port || 1337;
  http.createServer(onRequest).listen(port);
  console.log('Server has started on port: ' + port);
}

exports.start = start;