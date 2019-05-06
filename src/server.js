'use strict';
var express = require('express');
var request = require('request');

var cookieParser = require('cookie-parser');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

console.log(__dirname);
app.use(express.static(__dirname, {'index': ['index.html', 'login.html']}))
   .use(cookieParser());

app.use(express.static(__dirname + '/public'));

// socket.io connection
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
   console.log('user disconnected');
 });
 socket.on('chat message', function(msg){
    console.log('[server]message: ' + msg);
    // io.emit('chat message', msg);
    socket.broadcast.emit('chat message', msg);
  });
});

app.set('port', (process.env.PORT || 8889));
http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
