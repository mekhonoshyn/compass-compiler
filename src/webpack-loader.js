import {transformSource} from './helper';
import logger from './logger';

const IS_RAW = true;

export {
    compassCompilerLoader as default,
    IS_RAW as raw
};

function compassCompilerLoader() {
    const {resourcePath} = this;

    logger.info(`start processing "${resourcePath}"`);

    const callback = this.async();

    transformSource(resourcePath, (error, result) => {
        if (error) {
            logger.error(`processing failed for "${resourcePath}" due to error "${error.trim()}"`);

            return callback(error);
        }

        logger.info(`successfully processed "${resourcePath}"`);

        return callback(null, result);
    });
}
