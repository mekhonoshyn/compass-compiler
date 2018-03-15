import path from 'path';
import {
    initialize as configInitialize,
    finalize as configFinalize
} from './config';

const webpackLoaderPath = path.join(__dirname, 'webpack-loader');

export default {
    webpackLoaderPath,

    initialize,
    finalize
};

function initialize(options) {
    configInitialize(options);
}

function finalize() {
    configFinalize();
}
