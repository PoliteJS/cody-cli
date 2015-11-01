
// need to detect SIGINT and shut down the server gracefully

var path = require('path');
var express = require('express');
var cody = require('../lib/cody');

console.log(' ');
console.log('# Cody:');
console.log('Starting HTTP Server...');
console.log(' ');

var app = express();
app.use(express.static(process.env.CODY_BUILD));

var server = app.listen(process.env.CODY_PORT, function() {
    var port = server.address().port;

    console.log(' ');
    console.log('# Cody:');
    console.log('listening at http://localhost:%s', process.env.CODY_PORT);
    console.log(' ');
});

function shutdown() {
    console.log(' ');
    console.log('# Cody:');
    console.log('Stopping HTTP Server...');
    console.log(' ');

    server.close();
    process.exit();
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('exit', shutdown);
process.on('uncaughtException', shutdown);
