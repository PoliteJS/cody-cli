
var path = require('path');
var express = require('express');
var cody = require('../lib/cody');

cody.log('Starting HTTP Server');

var app = express();
app.use(express.static(process.env.WDEV_BUILD));

var server = app.listen(8080, function() {
    var port = server.address().port;
    cody.log('listening at http://localhost:%s', port);
});
