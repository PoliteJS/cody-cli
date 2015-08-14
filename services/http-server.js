
var path = require('path');
var express = require('express');
var wdev = require('../lib/wdev');

wdev.log('Starting HTTP Server');

var app = express();
app.use(express.static(process.env.WDEV_BUILD));

var server = app.listen(8080, function() {
    var port = server.address().port;
    wdev.log('listening at http://localhost:%s', port);
});
