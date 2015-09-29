var http = require("http");
var url = require("url");

function start(handle, route) {
	function onRequest(request, response) {
		var postData = '';
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		request.setEncoding('utf8');
		request.addListener('data', function (postDataChunk) {
			postData += postDataChunk;
			console.log('received post data chunk: ' + postDataChunk);
		});

		request.addListener('end', function () {
			route(handle, pathname, response, postData);
		});
	}
	http.createServer(onRequest).listen(1337);
	console.log("Server has started.");
}
exports.start = start;