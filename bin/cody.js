#! /usr/bin/env node

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var path = require('path');
var md5 = require('md5');
var cody = require('../lib/cody');
var run = require('../lib/run');
var checkPort = require('../lib/check-port');

var projectHash = md5(process.cwd());
var projectSrc = process.cwd();
var projectDest = path.join(getUserHome(), '.cody-cli', 'projects', projectHash);
var projectBuild = path.join(projectDest, 'build');

var services = [];

cody.init({
    CODY_HASH: projectHash,
    CODY_SRC: projectSrc,
    CODY_DEST: projectDest,
    CODY_BUILD: projectBuild,
    CODY_PORT: 8080
});

checkPort(8080, function(portIsAvailable) {
    if (!portIsAvailable) {
        console.log(' ');
        console.log('# Cody Error:');
        console.log('Port', cody.env('CODY_PORT'), 'is not available');
        console.log(' ');
        return;
    }

    // start Cody!
    run.script('checkup').then(function() {

        // dev only
        // run.gulp('copy-assets');return;

        // run services
        run.gulp('build').then(function() {
            services.push(run.service('gulp-watch'));
            services.push(run.service('http-server'));
        });
    });
});

/** 
 * gracefully shutdown
 */
process.on('SIGINT', function() {
    console.log(' ');
    services.forEach(function(service) { service.kill() });
    setTimeout(function() { process.exit() });
});

