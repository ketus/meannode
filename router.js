function route(handle, pathname){
	console.log('routing: ' + pathname);
  if(typeof handle[pathname] === 'function'){
    return handle[pathname]();
  } else {
    console.log('no handler found for pathname: ' + pathname.toString());
    return '404 error'
  }
}
exports.route = route;
