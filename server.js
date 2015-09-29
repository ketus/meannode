var http = require("http");
var url = require("url");

function start(handle, route) {
	function onRequest(request, response) {
		var postData = '';
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }

	http.createServer(onRequest).listen(1337);
	console.log("Server has started.");
}

exports.start = start;