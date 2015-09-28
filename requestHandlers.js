var exec = require('child_process').exec;

function start(response){
	console.log("Request handler 'start' was called.");

	exec("find /",
		{ timeout: 10000, maxBuffer: 20000*1024 },
		function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(stdout);
		response.end();
	});
}
function upload(response) {
  console.log('handler for /upload ');
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write('hi upload');
	response.end();
}
exports.start = start;
exports.upload = upload;