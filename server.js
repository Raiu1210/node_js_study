var http = require('http');
var ejs  = require('ejs');
var qs   = require('querystring');
var fs     = require('fs');
var config = require('./config');
var server = http.createServer();

var posts = [];

function renderForm(posts, res) {
	var data = ejs.render(template, {
		posts: posts
	});

	res.writeHead(200, {'Content-Type' : 'text/html'});
   	res.write(data);
   	res.end();
}

var template = fs.readFileSync(__dirname + '/hello.ejs', 'utf-8');


server.on('request', function(req, res) {
	if (req.method === 'POST') {
		req.data = "";
		req.on("readable", function() {
			req.data += req.read() || '';
			console.log(req.data);
		})
		req.on("end", function() {
			var query = qs.parse(req.data);
			console.log(query);
			posts.push(query.user_name);
			renderForm(posts, res);
		})
	} else {
		renderForm(posts, res);
	}
});

server.listen(config.port);
console.log('port number: ' + config.port);