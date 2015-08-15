#! /usr/bin/env node

var path = require('path');
var md5 = require('md5');
var wdev = require('../lib/wdev');
var run = require('../lib/run');

var projectHash = md5(process.cwd());
var projectSrc = process.cwd();
var projectDest = path.join(__dirname, '..', 'projects', projectHash);
var projectBuild = path.join(projectDest, 'build');

wdev.init({
    WDEV_HASH: projectHash,
    WDEV_SRC: projectSrc,
    WDEV_DEST: projectDest,
    WDEV_BUILD: projectBuild
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

