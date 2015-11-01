// https://gist.github.com/timoxley/1689041

var net = require('net');

module.exports  = function checkPort(port, fn) {
    var tester = net.createServer()
        .once('error', function (err) {
            fn(false);
        })
        .once('listening', function() {
            tester.once('close', function() {
                fn(true);
            })
            .close()
        })
        .listen(port);
};
