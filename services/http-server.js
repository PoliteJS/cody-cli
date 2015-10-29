
var path = require('path');
var express = require('express');
var cody = require('../lib/cody');

cody.log('Starting HTTP Server');

var app = express();
app.use(express.static(process.env.CODY_BUILD));

var server = app.listen(process.env.CODY_PORT, function() {
    var port = server.address().port;
    cody.log('listening at http://localhost:%s', process.env.CODY_PORT);
});
