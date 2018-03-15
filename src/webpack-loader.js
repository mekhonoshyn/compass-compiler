import {transformSource} from './helper';

const IS_RAW = true;

export {
    compassCompilerLoader as default,
    IS_RAW as raw
};

function compassCompilerLoader() {
    const callback = this.async();

    transformSource(this.resourcePath, (error, result) => {
        if (error) {
            return callback(error);
        }

        return callback(null, result);
    });
}
