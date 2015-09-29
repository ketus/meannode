var queryString = require('querystring');
var colors = require('colors');
var fs = require('fs');

function start(response, postData){
	console.log("Request handler 'start' was called.".green);

	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
		'<input type="file" name="upload"> ' +
		'<input type="submit" value="Submit file" />'+
		'</form>'+
		'</body>'+
		'</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, postData) {
  console.log('handler for /upload '.green);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write('from form: ' + queryString.parse(postData).text);
	response.end();
}

function show(response, postData){
  console.log('handler for /show '.green);
  fs.readFile('/tmp/test.png','binary', function (err, file) {
    if(err) {
      response.writeHead(500, {'Content-type' : 'text.plain'});
      response.write(err + '\n');
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write('reading from \'/tmp/test.png\'');
      response.write(file, 'binary');
      response.end();
    }
  });
}


exports.start = start;
exports.upload = upload;
exports.show = show;