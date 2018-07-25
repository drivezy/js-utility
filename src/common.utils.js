/**
 * All the function that required to be used in many places 
 * will be written here.
 * 
 * There would be dummy screen till these datas are fetched.
 * We will use switch cases to handle website and apps.,
 */

/**
 * Move a object from array from index to some index
 * 
 * @param {Array} arr 
 * @param {Number} fromIndex 
 * @param {Number} toIndex 
 */
export function MoveElementFromIndexToIndex(arr, fromIndex, toIndex) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr;
}

/**
 * Filter object keys
 * @param  {object} obj
 * @param  {string} filter - comma seprated keys
 */
export function FilterObjectKeys(obj, filter) {
  if (!(obj && typeof obj == 'object' && filter && typeof filter == 'string')) {
    return obj;
  }
  const filteredObject = {};
  const keys = filter.split(',');
  keys.forEach((key) => {
    filteredObject[key] = obj[key];
  })
  return filteredObject;
}

/**
 * Filter array of objects by keys
 * @param  {array} array
 * @param  {string} filter - comma seprated keys
 */
export function FilterArrayOfObjectKeys(array, filter) {
  if (!(Array.isArray(array) && filter && typeof filter == 'string')) {
    return array;
  }
  const filteredArray = [];
  array.forEach((item) => {
    filteredArray.push(FilterObjectKeys(item, filter));
  })
  return filteredArray;
}

/*
 * This function returns a filtered array based on key and value parameters
 * @param {array} arr 
 * @param {string} key 
 * @param {*} value 
 */
export function FilterArray(arr, key, value) {
  // Check for valid input
  if (!(Array.isArray(arr) && typeof key == 'string')) {
    return [];
  }
  let filteredArray = [];
  arr.forEach((item) => {
    if (AccessNestedObject(item, key) == value) {
      filteredArray.push(item);
    }
  })
  return filteredArray;
}

/*
 * find a nested object property inside of an object.
 * @param  {array} path
 * @param  {object} obj
 */
export function AccessNestedObject(obj, path, valueNotFound = undefined) {
  if (!((Array.isArray(path) || (typeof path == 'string')) && obj && typeof obj == 'object')) {
    return valueNotFound;
  }
  if (typeof path == 'string') {
    path = path.split('.');
  }
  return path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : valueNotFound, obj)
}

/**
 * This function returns filtered Object based on the keys passed in the array
 * @param {object} obj 
 * @param {array} keys 
 */
export function FilteredObject(obj, keys) {
  let filteredObj = {};
  //Check for Valid Input
  if (!(typeof obj == 'object' && Array.isArray(keys))) {
    return {};
  }
  keys.forEach((key) => {
    filteredObj[key] = obj[key];
  })
  return filteredObj;
}

/**
 * This function returns distance between two locations
 * @param {number} latitude1 number that gives latitude of location
 * @param {number} latitude2 
 * @param {number} longitude1 number that gives longitude of location
 * @param {number} longitude2
 */
export function DistanceBetweenTwoLocation(latitude1, longitude1, latitude2, longitude2) {
  const RadiusOfEarth = 6371e3; // Radius of the earth in meter
  const differenceOfTwoLatitude = (latitude2 - latitude1) * (Math.PI / 180);  // deg2rad below
  const differenceOfTwoLongitude = (longitude2 - longitude1) * (Math.PI / 180);
  const squareOfHalfChordlengthbetweenPoints =
    Math.sin(differenceOfTwoLatitude / 2) * Math.sin(differenceOfTwoLatitude / 2) +
    Math.cos((latitude1) * (Math.PI / 180)) * Math.cos((latitude2) * (Math.PI / 180)) *
    Math.sin(differenceOfTwoLongitude / 2) * Math.sin(differenceOfTwoLongitude / 2)
    ;
  const angularDistanceInRadians = 2 * Math.atan2(Math.sqrt(squareOfHalfChordlengthbetweenPoints), Math.sqrt(1 - squareOfHalfChordlengthbetweenPoints));
  const distance = RadiusOfEarth * angularDistanceInRadians;
  return distance;
}

/*
 * Function to generate random string of [a-z]
 * @param  {string} length
 */
export function GenerateRandomString(length) {
  let text = "";
  const possible = "abcdefghijklmnopqrstuvwxyz";
  length = length || 0;
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

/**
 * Function to round off the 'number' to multiple of 'limit'
 * @param  {number} number
 * @param  {number} limit
 */
export function RoundOffToNumber(number, limit) {
  return Math.floor(number / limit) * limit;
}

/**
 * return boolean if given variable is undefined or null
 * @param  {} value
 */
export function IsUndefinedOrNull(value) {
  return (value == null || value == '' || value == undefined);
}

/**
 * Converts object to array
 * @param  {object} obj
 */
export function ObjectToArray(obj) {
  if (!(obj && typeof obj == 'object')) {
    return obj;
  }
  const arr = Object.values(obj);
  return arr;
}

/**
 * Capitalize first letter of the string 
 * ex- aaaaaa is converted to Aaaaaa
 * @param  {string} string
 */
export function CapitalizeFirstLetter(string) {
  if (!(string && typeof string == 'string')) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
