/**
 * Child process runner
 */

var childProcess = require('child_process');
var path = require('path');
var extend = require('extend');

var wdev = require('./wdev');

function getLocalEnv() {
    return extend(true, {}, process.env, wdev.env());
}

function runCommand(cmd, args) {
    return childProcess.spawn(cmd, args || [], {
        cwd: process.cwd(),
        env: getLocalEnv()
    });
}

function runService(serviceName) {
    var servicePath = path.join(__dirname, '..', 'services', serviceName);
    var service = runCommand('node', [
        '--harmony',
        servicePath
    ]);

    service.stdout.on('data', function(data) {
        getStdLines(data).forEach(function(line) {
            console.log('[' + serviceName + '] ' + line);    
        });
    });

    service.stderr.on('data', function(data) {
        getStdLines(data).toString().split('\n').forEach(function(line) {
            console.error('[' + serviceName + '] ' + line);    
        });
    });

    return service;
}

function runScript(scriptName) {
    return new Promise(function(resolve, reject) {
        var servicePath = path.join(__dirname, '..', 'scripts', scriptName);
        var callback = arguments[1] || function() {};

        var script = runCommand('node', [
            '--harmony',
            servicePath
        ]);

        script.stdout.on('data', function(data) {
            getStdLines(data).forEach(function(line) {
                console.log('[' + scriptName + '] ' + line);    
            });
        });

        script.stderr.on('data', function(data) {
            getStdLines(data).toString().split('\n').forEach(function(line) {
                console.error('[' + scriptName + '] ' + line);    
            });
        });

        script.on('exit', function(code) {
            if (code === 0) {
                resolve();
            } else {
                reject(code);
            }
        });
    });
}

function runGulp(taskName) {
    return new Promise(function(resolve, reject) {
        var gulpCmd = path.join(__dirname, '..', 'node_modules', 'gulp', 'bin', 'gulp.js');
        var callback = arguments[1] || function() {};
        
        var script = childProcess.spawn(gulpCmd, [
            '--harmony',
            taskName
        ], {
            cwd: path.join(__dirname, '..'),
            env: getLocalEnv()
        });

        script.stdout.on('data', function(data) {
            getStdLines(data).forEach(function(line) {
                console.log('[' + taskName + '] ' + line);    
            });
        });

        script.stderr.on('data', function(data) {
            getStdLines(data).toString().split('\n').forEach(function(line) {
                console.error('[' + taskName + '] ' + line);    
            });
        });

        script.on('exit', function(code) {
            if (code === 0) {
                resolve();
            } else {
                reject(code);
            }
        });
    });
}

function getStdLines(stdData) {
    var lines = stdData.toString().split('\n');
    if (lines[lines.length - 1] == '') {
        lines.pop();
    }
    return lines;
}

module.exports = {
    cmd: runCommand,
    service: runService,
    script: runScript,
    gulp: runGulp
};
