/**
 This class is used for interacting with apis.
 */

/**
 Default headers to be used for api calls
 */
const defaultHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Credentials': 'same-origin'
};

/**
 Constants
 */
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

let BASE_URL = undefined;
let validationObject = {};
let fileUpload = 'api';

/*
Gateway for all the api calls
implements get, post, put, delete calls
*/


/**
 * 
 * @param {String} baseUrl 
 * @param {Array} validationArray
 */
export function Initialize(baseUrl, validationArray = [], fileUpload = 'api') {
    BASE_URL = baseUrl;
    fileUpload = fileUpload;
    /**
     validationArray = [
         {
             endpoint: '/login',
             method: 'POST'
             body: [
                 {
                    key : username
                    isRequired : 1,
                    canBeNullOrUndefined:0
                 },
                 {
                    key : password,
                    isRequired : 1,
                    canBeNullOrUndefined:0
                 },
                 {
                    key : referred_by,
                    isRequired : 0,
                    canBeNullOrUndefined:1
                 }
             ]
         },
         {},
         {}
     ]

     Here 1 is Required field
     0 is optional
     */
    CreateValidationObjectFromArray(validationArray);
}


/**
This would convert array to object for easy handling and avoids iterating on loop
*/
export async function CreateValidationObjectFromArray(validationArray) {
    let tempValidationObject = {};
    for (let i = 0; i < validationArray.length; i++) {

        let singleObject = {};

        if (!IsUndefinedOrNull(validationArray[i].body)) {
            singleObject['' + validationArray[i].method + validationArray[i].endpoint] = validationArray[i].body;
        }

        tempValidationObject = { ...tempValidationObject, ...singleObject };
    }

    /** Save object in global variable */
    validationObject = tempValidationObject;
}


/**
 * GET
 * @param {Object} obj.
 * It contains url, body, headers(Optional)
 */
export async function Get(obj) {
    if (!(obj && obj.url)) {
        return {
            error: 'Invalid endpoint',
            status: 0
        }
    }

    obj.method = GET;

    const params = await GetNecessaryParams(obj);

    if (params.status != 0) {
        return ApiCall(params);
    } else {
        return params
    }
}

/**
 * POST
 * @param {Object} obj.
 * It contains url, body, headers(Optional)
 */
export async function Post(obj) {
    if (!(obj && obj.url)) {
        return {
            error: 'Invalid endpoint',
            status: 0
        }
    }

    obj.method = POST;

    const params = await GetNecessaryParams(obj);

    if (params.status != 0) {
        return ApiCall(params);
    } else {
        return params
    }
}

/**
 * PUT
 * @param {Object} obj.
 * It contains url, body, headers(Optional)
 */
export async function Put(obj) {
    if (!(obj && obj.url)) {
        return {
            error: 'Invalid endpoint',
            status: 0
        }
    }

    obj.method = PUT;

    const params = await GetNecessaryParams(obj);

    if (params.status != 0) {
        return ApiCall(params);
    } else {
        return params
    }
}

/**
 * DELETE
 * @param {Object} obj.
 * It contains url, body, headers(Optional)
 */
export async function Delete(obj) {
    if (!(obj && obj.url)) {
        return {
            error: 'Invalid endpoint',
            status: 0
        }
    }

    obj.method = DELETE;

    const params = await GetNecessaryParams(obj);

    if (params.status != 0) {
        return ApiCall(params);
    } else {
        return params
    }
}

/**
 * Upload
 * @param {Object} obj.
 * It contains url, body, headers(Optional)
 * Also array of images
 */
export async function UploadImages(obj, images) {
    if (!(obj && obj.url)) {
        return {
            error: 'Invalid endpoint',
            status: 0
        }
    }

    obj.method = POST;

    const params = await GetNecessaryParams(obj);

    /** Attach multipart form data in headers */
    params.headers = { ...params.headers, ...{ 'Content-Type': 'multipart/form-data' } }

    /** Create multipart form data body for passing */
    var formData = new FormData();
    for (let index = 0; index < images.length; index++) {
        formData.append((images[index]).name, (images[index]).file);
    }

    for (var key in params.body) {
        formData.append(key, params.body[key]);
    }

    params.body = formData;

    /** Call api and upload files */
    if (params.status != 0) {
        return ApiCall(params);
    } else {
        return params
    }
}

/**
 * prepares params for making api calls
 * including headers, url, params, resolve, reject
 * @param  {object} obj
 */
export async function GetNecessaryParams(obj) {
    if (IsUndefinedOrNull(BASE_URL)) {
        return {
            error: 'Invalid domain path',
            status: 0
        }
    }

    /** Create Url */
    const url = CreateFinalUrl(obj);
    console.log('Url',url)
    /** Create api call method type */
    const method = obj.method || GET;  /** If api method is not declared, default is GET */

    /** Create headers */
    const headers = await CreateHeader(obj);

    const responseObj = {
        url, method, headers
    };

    if (obj.body) {
        /** Check if there is valid body */

        const checked = HasRequiredParameters(obj);
        if (checked) {
            responseObj.body = JSON.stringify(obj.body);
        } else {
            return {
                error: 'Parameters error. Please see log for details...',
                status: 0
            }
        }
    }
    return (responseObj);
}

/** This method checks and returns for all required paramters in an api */
export function HasRequiredParameters(obj) {
    let isValid = true;

    const searchString = '' + obj.method + obj.url

    const requiredParamters = validationObject[searchString];

    if (IsUndefinedOrNull(requiredParamters)) {
        return isValid
    }

    const objectParamters = obj.body;

    for (let index = 0; index < requiredParamters.length; index++) {
        const elementKey = requiredParamters[index].key;
        const elementIsRequired = requiredParamters[index].isRequired

        if (elementIsRequired) {
            if (!(objectParamters.hasOwnProperty(elementKey))) {
                console.log('Required parameter ' + elementKey + ' is missing in ' + obj.url);
                isValid = false;
                break
            }


            if (objectParamters[elementKey] == undefined || objectParamters[elementKey] == null) {
                console.log('Required parameter ' + elementKey + ' can not be null in ' + obj.url);
                isValid = false;
                break
            }
        }
    }

    return isValid;
}

/**
 * takes params along with end point, adds with prefix url and return final url
 * @param  {object} obj
 */
export function CreateFinalUrl(obj) {
    const url = BASE_URL + obj.url;
    return url;
}

/**
 * takes extra headers(optional) and extend with default header
 * @param  {object} obj
 */
export function CreateHeader(obj) {
    const headers = defaultHeaders;
    return headers

    if (!obj.headers) {
        return headers;
    }

    /** Merge both headers and return */
    return { ...headers, ...obj.headers };
}


/**
 * final level method to make api call
 * used for all kind of methods(get, put, post), except delete
 * @param  {string} {url
 * @param  {function} method
 * @param  {object} headers
 */
export async function ApiCall({ url, method, headers, body }) {
    var request = new Request(url, {
        method,
        headers,
        body
    });

    return fetch(request)
        .then(response => {
            return response.json().then(data => {
                if (response.status == 200) {
                    return ({ status: response.status, data: data })
                } else {
                    return {
                        status: response.status,
                        error: response
                    }
                }

            }).catch(error => {
                return {
                    status: 0,
                    error: 'JSON parsing error for url=' + url + 'body=' + body
                }
            })
        }).catch(error => {
            return {
                status: 0,
                error: 'Network Request failed or domain name for url=' + url + 'body=' + body
            }
        })
}

/**
 Check if the property is undefined or null
 */
export function IsUndefinedOrNull(property) {
    if (property == undefined || property == null) {
        return true
    }
    return false
}