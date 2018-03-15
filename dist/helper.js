'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transformSource = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _which = require('which');

var _child_process = require('child_process');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = new Map();

exports.transformSource = transformSource;


function transformSource(filePath, callback) {
    var _arguments = arguments;

    var executable = null;

    if (cache.has(filePath)) {
        return _fs2.default.readFile(cache.get(filePath), callback);
    }

    try {
        executable = (0, _which.sync)('compass');
    } catch (error) {
        return callback(new Error('You need to have Ruby and Compass installed and in your system PATH for this task to work.'));
    }

    var query = [];
    var sassDir = filePath.startsWith((0, _config.property)('sassDir')) ? (0, _config.property)('sassDir') : _path2.default.parse(filePath).dir;

    query.push((0, _config.property)('task'));
    query.push((0, _config.property)('project'));
    query.push(filePath.replace(/\\/g, '/'));

    query.push('--environment', (0, _config.property)('environment'));

    query.push('--output-style', (0, _config.property)('outputStyle'));

    if ((0, _config.property)('noLineComments')) {
        query.push('--no-line-comments');
    }

    if ((0, _config.property)('relativeAssets')) {
        query.push('--relative-assets');
    }

    query.push('--css-dir', (0, _config.property)('cssDir'));

    query.push('--sass-dir', sassDir);

    query.push('--fonts-dir', (0, _config.property)('fontsDir'));

    query.push('--images-dir', (0, _config.property)('imagesDir'));

    if ((0, _config.property)('javascriptsDir')) {
        query.push('--javascripts-dir', (0, _config.property)('javascriptsDir'));
    }

    if ((0, _config.property)('generatedImagesPath')) {
        query.push('--generated-images-path', (0, _config.property)('generatedImagesPath'));
    }

    if ((0, _config.property)('httpPath')) {
        query.push('--http-path', (0, _config.property)('httpPath'));
    }

    (0, _config.property)('importPath').forEach(function (importPath) {
        query.push('-I', importPath);
    });

    (0, _config.property)('require').forEach(function (requirePath) {
        query.push('--require', requirePath);
    });

    if ((0, _config.property)('verbose')) {
        query.push('--debug-info');
    }

    if ((0, _config.property)('loadAll')) {
        query.push('--load-all', (0, _config.property)('loadAll'));
    }

    if ((0, _config.property)('time')) {
        query.push('--time');
    }

    if ((0, _config.property)('sourceMap')) {
        query.push('--sourcemap');
    }

    if ((0, _config.property)('boring')) {
        query.push('--boring');
    }

    if ((0, _config.property)('force')) {
        query.push('--force');
    }

    if ((0, _config.property)('trace')) {
        query.push('--trace');
    }

    if ((0, _config.property)('verbose')) {
        console.info('Running command:', executable, query.join(' '));
    }

    var child = (0, _child_process.spawn)(executable, query, { cwd: (0, _config.property)('project') });

    if ((0, _config.property)('verbose')) {
        child.stdout.setEncoding('utf8');
        child.stdout.on('data', function (data) {
            console.log(data);
        });

        child.stderr.setEncoding('utf8');
        child.stderr.on('data', function (data) {
            if (!data.match(/^\u001b\[\d+m$/)) {
                console.error(data);
            }
        });
    }

    child.on('close', function (code) {
        if (code) {
            return callback(_arguments);
        }

        var dir = filePath.dir,
            name = filePath.name;

        var relativeDir = _path2.default.relative(sassDir, dir);

        cache.set(filePath, _path2.default.join((0, _config.property)('project'), (0, _config.property)('cssDir'), relativeDir, name + '.css'));

        _fs2.default.readFile(cache.get(filePath), callback);
    });
}