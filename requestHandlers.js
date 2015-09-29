var queryString = require('querystring');
var colors = require('colors');
var formi = require('formidable');
var fs = require('fs');

function start(response){
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

function upload(response, request) {
  console.log('handler for /upload '.green);

  var form = new formi.IncomingForm();
  form.parse(request, function (err, fields, files) {
    console.log('form parsed');

    fs.rename(files.upload.path, '/tmp/test.png', function () {
      if(err){
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp/test.png');
      }
    });

  });
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write('got image:<br/>');
	response.write('<img src="/show" />');
  response.end();
}

function show(response){
  console.log('handler for /show '.green);
  fs.readFile('/tmp/test.png','binary', function (err, file) {
    if(err) {
      response.writeHead(500, {'Content-type' : 'text.plain'});
      response.write(err + '\n');
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, 'binary');
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;