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

cody.init({
    CODY_HASH: projectHash,
    CODY_SRC: projectSrc,
    CODY_DEST: projectDest,
    CODY_BUILD: projectBuild,
    CODY_PORT: 8080
});

checkPort(8080, function(portIsAvailable) {
    if (portIsAvailable) {
        runCody();
    } else {
        console.log(' ');
        console.log(' ');
        console.log('# Cody:');
        console.log('Port', cody.env('CODY_PORT'), 'is not available');
        console.log(' ');
        console.log(' ');
    }
});


function runCody() {
    run.script('checkup').then(function() {
        var tasks = [];
        var tasks1 = [];

        // dev only
        // run.gulp('copy-assets');return;

        tasks.push(run.gulp('copy-assets'));
        tasks.push(run.gulp('copy-html'));
        tasks.push(run.gulp('copy-css'));
        tasks.push(run.gulp('copy-js'));

        tasks.push(run.gulp('transpile-less'));
        tasks.push(run.gulp('transpile-scss'));
        tasks.push(run.gulp('transpile-js'));
        
        Promise.all(tasks).then(function() {
            run.gulp('lint-js');
            run.gulp('lint-css');
            run.gulp('watch');
            
            run.service('http-server');
        });
    });
}
