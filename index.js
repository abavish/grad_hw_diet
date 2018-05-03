//var http = require('http');
var fs = require('fs');
var server = require('diet');
//var wss = require('./websockets-server');
var app = server();
app.listen('http://localhost:8000');

var static = require('diet-static')({
  path: app.path + '/app/'
});
app.footer(static);

app.get('/', function($) {
  $.redirect('index.html');
});

// Error handling code
app.missing(function($) {
  $.header('Content-Type', 'text/html');
  $.status('404', 'Page not found');
  fs.readFile(__dirname + '/app/error.html', function(error, data) {
    if (error) {
      console.trace('Something bad happened.', $.status, $.error.message);
    }
    // throw error;
    $.end(data.toString());
  });
});
