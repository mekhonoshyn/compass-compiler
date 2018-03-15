'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.raw = exports.default = undefined;

var _helper = require('./helper');

var IS_RAW = true;

exports.default = compassCompilerLoader;
exports.raw = IS_RAW;


function compassCompilerLoader() {
    var callback = this.async();

    (0, _helper.transformSource)(this.resourcePath, function (error, result) {
        if (error) {
            return callback(error);
        }

        return callback(null, result);
    });
}