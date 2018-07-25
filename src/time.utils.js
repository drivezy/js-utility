import moment from 'moment';
import { DEFAULT_API_DATE_FORMAT, DEFAULT_DATE_TIME_TILL_MIN_FORMAT } from './Constants/project.constants';
moment.suppressDeprecationWarnings = true;

// export function TimeZoneHandler() {
//     const timedifference = new Date().getTimezoneOffset();
// }

/**
 * formats time according to format sent in params
 * @param  {string} time
 * @param  {string} format
 * @param  {boolean} convertTimeFormat -  if true, date is first parsed then converted
 */
// export function FormatTime(time, format = 'YYYY-MM-DD HH:mm:ss', convertTimeFormat = false) {
export function FormatTime(time, format = DEFAULT_API_DATE_FORMAT, convertTimeFormat = false) {
    if (convertTimeFormat) {
        /* eslint-disable */
        time = new Date(time);
        /* eslint-enable */
    }
    if (time) {
        return moment(time).format(format);
    }
    return moment().format(format);
}

/**
 * return hour difference
 * @param  {string} startTime
 * @param  {string} endTime
 */
export function GetHoursDifference(startTime = moment().format(DEFAULT_API_DATE_FORMAT), endTime = moment().format(DEFAULT_API_DATE_FORMAT), convertTimeFormat = false) {
    if (convertTimeFormat) {
        /* eslint-disable */
        startTime = new Date(startTime);
        endTime = new Date(endTime);
        /* eslint-enable */
    }
    return moment.duration(moment(endTime).diff(startTime)).asHours().toFixed(0);
}

/**
 * return minute difference
 * @param  {string} startTime
 * @param  {string} endTime
 */
export function GetMinutesDifference(startTime, endTime) {
    const newEndTime = endTime || moment().format(DEFAULT_DATE_TIME_TILL_MIN_FORMAT); // If end time is not given, takes current time
    const newStartTime = startTime || moment().format(DEFAULT_DATE_TIME_TILL_MIN_FORMAT); // If start time is not given, takes current time
    return moment.duration(moment(newEndTime).diff(newStartTime)).asMinutes().toFixed(0);
}

/**
 * Function returns the current time 
* @param {*} time 
*/
export function CurrentTime(time) {
    return time ? moment(time).format(DEFAULT_API_DATE_FORMAT) : moment().format(DEFAULT_API_DATE_FORMAT);
}

/**
 * adds time 
 * @param  {string} time -  ex '2017-01-14 14:22:22'
 * @param  {number} add - ex 2
 * @param  {string} parameter - can be days, hours, months
 * @param  {string} format(optional) - can be days, hours, months
 */
export function AddTime(time, add, parameter, format) {
    const newFormat = format || DEFAULT_API_DATE_FORMAT;
    return moment(time).add(add, parameter).format(newFormat);
}

/**
 * subtracts time 
 * @param  {string} time -  ex '2017-01-14 14:22:22'
 * @param  {number} remove - ex 2
 * @param  {string} parameter - can be days, hours, months
 */
export function SubtractTime(time, remove, parameter) {
    return moment(time).subtract(remove, parameter).format(DEFAULT_API_DATE_FORMAT);
}

/**
 * Function return time in format
 * @param {*} time 
 */
export function ConvertTime(time) {
    return moment(time, DEFAULT_DATE_TIME_TILL_MIN_FORMAT).toDate();
}

/**
 * Function return Time Stamp
 * @param {number} i - [optional]
 */
export function GetTimeStamp(i = 0) {
    return `${moment().unix()}${i}`;
}

/**
 * Function to add Padding of 0 if number id sigle digit
 * @param  {number} num
 */
function Padding(num) {
    return `0${num}`.slice(-2);
}

/**
 * Function to convert seconds to mm:ss format
 * @param  {number} secs
 */
export function ConverToMMSSFormat(secs) {
    let Seconds = secs;
    let minutes = Math.floor(Seconds / 60);
    Seconds = Seconds % 60;
    minutes = minutes % 60;
    return `${Padding(minutes)}:${Padding(Seconds)}`;
}

/**
 * return a string telling the difference between the start time and end time in days and hours format
 * @param  {string} startTime
 * @param  {string} endTime
 */
export function GetDaysHoursDiffrenceString(startTime, endTime) {
    const hourDiff = GetHoursDifference(startTime, endTime);
    if (hourDiff > 0) {
        let returnString = '';
        const hours = hourDiff % 24;
        const days = Math.floor(hourDiff / 24);

        if (days > 0) { returnString = returnString.concat(`${days} day${days > 1 ? 's' : ''}`); }
        if (days > 0 && hours > 0) { returnString = returnString.concat(' and '); }
        if (hours > 0) { returnString = returnString.concat(`${hours} hour${hours > 1 ? 's' : ''}`); }

        return returnString;
    }
    return '';
}
