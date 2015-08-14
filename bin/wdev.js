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
    var gulp = run.gulp('copy-html');
    Promise.all([gulp]).then(function() {
        run.service('http-server');
    });
});

