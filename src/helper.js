import fs from 'fs';
import {sync as which} from 'which';
import {spawn} from 'child_process';
import {property as configProperty} from './config';

export {transformSource};

function transformSource(filePath, callback) {
    let executable = null;

    try {
        executable = which('compass');
    } catch (error) {
        return callback(new Error('You need to have Ruby and Compass installed and in your system PATH for this task to work.'));
    }

    const query = [];
    const child = spawn(executable, query, {cwd: configProperty('project')});

    query.push(configProperty('task'));
    query.push(configProperty('project'));
    query.push(filePath.replace(/\\/g, '/'));

    query.push('--environment', configProperty('environment'));

    query.push('--output-style', configProperty('outputStyle'));

    if (configProperty('noLineComments')) {
        query.push('--no-line-comments');
    }

    if (configProperty('relativeAssets')) {
        query.push('--relative-assets');
    }

    query.push('--css-dir', configProperty('cssDir'));

    query.push('--sass-dir', configProperty('sassDir'));

    query.push('--fonts-dir', configProperty('fontsDir'));

    query.push('--images-dir', configProperty('imagesDir'));

    if (configProperty('javascriptsDir')) {
        query.push('--javascripts-dir', configProperty('javascriptsDir'));
    }

    if (configProperty('generatedImagesPath')) {
        query.push('--generated-images-path', configProperty('generatedImagesPath'));
    }

    if (configProperty('httpPath')) {
        query.push('--http-path', configProperty('httpPath'));
    }

    configProperty('importPath').forEach((importPath) => {
        query.push('-I', importPath);
    });

    configProperty('require').forEach((requirePath) => {
        query.push('--require', requirePath);
    });

    if (configProperty('verbose')) {
        query.push('--debug-info');
    }

    if (configProperty('loadAll')) {
        query.push('--load-all', configProperty('loadAll'));
    }

    if (configProperty('time')) {
        query.push('--time');
    }

    if (configProperty('sourceMap')) {
        query.push('--sourcemap');
    }

    if (configProperty('boring')) {
        query.push('--boring');
    }

    if (configProperty('force')) {
        query.push('--force');
    }

    if (configProperty('verbose')) {
        console.info('Running command:', executable, query.join(' '));
    }

    if (configProperty('verbose')) {
        child.stdout.setEncoding('utf8');
        child.stdout.on('data', (data) => {
            console.log(data);
        });

        child.stderr.setEncoding('utf8');
        child.stderr.on('data', (data) => {
            if (!data.match(/^\u001b\[\d+m$/)) {
                console.error(data);
            }
        });
    }

    child.on('close', (code) => {
        if (code) {
            return callback(arguments);
        }

        fs.readFile(filePath, callback);
    });
}
