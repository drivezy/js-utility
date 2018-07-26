import mlog from 'mocha-logger';

export function LogData(json) {
    mlog.success(JSON.stringify(json, null, 2));
}
