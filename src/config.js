import del from 'del';
import path from 'path';

const config = {};

export {
    property,

    initialize,
    finalize
};

function property(key) {
    return config[key];
}

function initialize({
    fntRelPath,
    imgRelPath,
    distRelPath,
    environment,
    isDevelopment
}) {
    const options = {
        environment,
        outputStyle: 'nested',
        noLineComments: !isDevelopment,
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
        project: path.join(process.cwd(), distRelPath),
        moduleName: 'webpack-compass-compiler'
    };

    Object.entries(options).forEach(([key, value]) => {
        Object.defineProperty(config, key, {enumerable: true, value});
    });
}

function finalize() {
    del.sync([
        path.join(property('project'), property('cssDir')),
        path.join(property('project'), '.sass-cache')
    ]);
}
