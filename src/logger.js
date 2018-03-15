import {property as configProperty} from './config';

export default {
    error,
    info,
    log
};

function error(message) {
    print('error', message);
}

function info(message) {
    print('info', message);
}

function log(message) {
    print('log', message);
}

function print(type, message) {
    if (configProperty('verbose')) {
        console.log(`[${type.toUpperCase()}] ${configProperty('moduleName')}:`, message);
    }
}
