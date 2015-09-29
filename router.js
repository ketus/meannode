function route(handle, pathname, response, postData){
	console.log('routing: ' + pathname);
  if(typeof handle[pathname] === 'function'){
    handle[pathname](response, postData);
  } else {
    console.log('no handler found for pathname: ' + pathname.toString());
    response.writeHead(200, {'Content-Type' : 'text/html'});
		response.write('404 Not found. Try <a href=\"/\">wat</a>');
		response.end();
  }
}
exports.route = route;
