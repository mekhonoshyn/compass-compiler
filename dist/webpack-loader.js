'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.raw = exports.default = undefined;

var _helper = require('./helper');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_RAW = true;

exports.default = compassCompilerLoader;
exports.raw = IS_RAW;


function compassCompilerLoader() {
    var resourcePath = this.resourcePath;


    _logger2.default.info('start processing "' + resourcePath + '"');

    var callback = this.async();

    (0, _helper.transformSource)(resourcePath, function (error, result) {
        if (error) {
            _logger2.default.error('processing failed for "' + resourcePath + '" due to error "' + error.trim() + '"');

            return callback(error);
        }

        _logger2.default.info('successfully processed "' + resourcePath + '"');

        return callback(null, result);
    });
}