
var path = require('path');

const CODY_CONFIG = require('../config/cody');
var CODY_ENV = {};

exports.init = function(env) {
    CODY_ENV = env;
};

exports.env = function(prop) {
    if (undefined !== prop) {
        return CODY_ENV[prop];
    }
    return CODY_ENV;
};

exports.config = function(prop) {
    if (undefined !== prop) {
        return CODY_CONFIG[prop];
    }
    return CODY_CONFIG;
};

exports.log = function() {
    var prefix = '(' + CODY_CONFIG.name + ') =>';
    console.log.apply(console, [prefix].concat(Array.prototype.slice.call(arguments)));
};
