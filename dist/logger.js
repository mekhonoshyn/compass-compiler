'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./config');

exports.default = {
    error: error,
    info: info,
    log: log
};


function error(message) {
    print('error', message);
}

function info(message) {
    print('info', message);
}

function log(message) {
    print('log', message);
}

function print(type, message) {
    if ((0, _config.property)('verbose')) {
        console.log('[' + type.toUpperCase() + '] ' + (0, _config.property)('moduleName') + ':', message);
    }
}