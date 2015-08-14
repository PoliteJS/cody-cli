
var path = require('path');

const WDEV_CONFIG = require('../config/wdev');
var WDEV_ENV = {};

exports.init = function(env) {
    WDEV_ENV = env;
};

exports.env = function() {
    return WDEV_ENV;
};

exports.config = function() {
    return WDEV_CONFIG;
};

exports.log = function() {
    var prefix = '(' + WDEV_CONFIG.name + ') =>';
    console.log.apply(console, [prefix].concat(Array.prototype.slice.call(arguments)));
};
