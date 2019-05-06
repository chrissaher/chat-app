'use strict';
var express = require('express');
var request = require('request');

var cookieParser = require('cookie-parser');

var app = express();

console.log(__dirname);
app.use(express.static(__dirname, {'index': ['index.html', 'login.html']}))
   .use(cookieParser());

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 8889));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
