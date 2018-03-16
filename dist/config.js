'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.finalize = exports.initialize = exports.property = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PRODUCTION = 'production',
    DEVELOPMENT = 'development';

var config = {};

exports.property = property;
exports.initialize = initialize;
exports.finalize = finalize;


function property(key) {
    return config[key];
}

function initialize(_ref) {
    var fntRelPath = _ref.fntRelPath,
        imgRelPath = _ref.imgRelPath,
        distRelPath = _ref.distRelPath,
        environment = _ref.environment;
    var isProduction = environment === PRODUCTION,
        isDevelopment = environment !== PRODUCTION;

    var options = {
        environment: isProduction ? PRODUCTION : DEVELOPMENT,
        outputStyle: 'nested',
        noLineComments: isProduction,
        relativeAssets: true,
        cssDir: '.css-temp',
        fontsDir: fntRelPath,
        imagesDir: imgRelPath,
        javascriptsDir: false,
        generatedImagesPath: false,
        httpPath: '/',
        importPath: [],
        require: [],
        verbose: isDevelopment,
        loadAll: false,
        time: isDevelopment,
        sourceMap: false,
        boring: false,
        force: true,
        trace: isDevelopment,
        task: 'compile',
        project: _path2.default.join(process.cwd(), distRelPath),
        moduleName: 'webpack-compass-compiler'
    };

    Object.entries(options).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        Object.defineProperty(config, key, { enumerable: true, value: value });
    });
}

function finalize() {
    _del2.default.sync([_path2.default.join(property('project'), property('cssDir')), _path2.default.join(property('project'), '.sass-cache')]);
}