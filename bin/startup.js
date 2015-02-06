var path = require('path');
var Server = require('../src/Server.js');
var Bucket = require('../src/Bucket.js');
var config = require('./plexi.json');
var options = config.preferences['plexi.http'];
var servers = options.servers;

for(var k in servers) {
	var options = servers[k];	
	var server = Server.create(options).listen();
	
	var bucket = new Bucket('test');
	bucket.get('/index.html', function(req, res, next) {
		res.send('bucket index.html');
	});
	server.mount('/' + k, bucket);
	
	//server.close();
}