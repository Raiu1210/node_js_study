var http = require('http');
var fs     = require('fs');
var config = require('./config');
var server = http.createServer();
var msg;

server.on('request', function(req, res) {
	res.writeHead(200, {'Content-Type' : 'text/plain'});

	switch (req.url) {
		case '/about':
			msg = 'Welcome about page';
			break;
		case '/company':
			msg = 'welcome my company page';
			break;
		default:
			msg = 'page not found';
			break;
	}

    res.write(msg);
    res.end();
});

server.listen(config.port);
console.log('port number: ' + config.port);