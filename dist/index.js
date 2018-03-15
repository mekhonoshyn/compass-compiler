'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpackLoaderPath = _path2.default.join(__dirname, 'webpack-loader');

exports.default = {
    webpackLoaderPath: webpackLoaderPath,

    initialize: initialize,
    finalize: finalize
};


function initialize(options) {
    (0, _config.initialize)(options);
}

function finalize() {
    (0, _config.finalize)();
}