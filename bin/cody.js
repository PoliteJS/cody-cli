#! /usr/bin/env node

var path = require('path');
var md5 = require('md5');
var cody = require('../lib/cody');
var run = require('../lib/run');

var projectHash = md5(process.cwd());
var projectSrc = process.cwd();
var projectDest = path.join(__dirname, '..', 'projects', projectHash);
var projectBuild = path.join(projectDest, 'build');

cody.init({
    CODY_HASH: projectHash,
    CODY_SRC: projectSrc,
    CODY_DEST: projectDest,
    CODY_BUILD: projectBuild,
    CODY_PORT: 3000
});

run.script('checkup').then(function() {
    var tasks = [];

    tasks.push(run.gulp('copy-html'));
    tasks.push(run.gulp('copy-css'));
    tasks.push(run.gulp('copy-js'));
    
    Promise.all(tasks).then(function() {
        run.gulp('lint-js');
        run.gulp('lint-css');

        run.gulp('watch');
        run.service('http-server');
    });
});

