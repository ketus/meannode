var http = require('http');
var url = require('url');

		http.createServer(onRequest).listen(8888);
		console.log("Server has started.");
}

exports.start = start;