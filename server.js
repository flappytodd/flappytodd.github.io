var config = require('./config');
var app = require('http').createServer();
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(config.serverPort);
console.log("Starting server on port " + config.serverPort);
count = 0;
io.on('connection', function(socket) {
        socket.on("connected", function(data){
		count+=1;
		console.log(count);
        });
});
