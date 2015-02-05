var fs = require("fs");

if (nativeModule === undefined) {
    var path = require('path');
    var parentPath = path.dirname(__filename) + '/..';
    var nativeModule = parentPath + "/binary/" + process.platform + "_" + process.arch + "/";
}

if (fs.existsSync(nativeModule) && typeof(UNIT_TEST) == "undefined" ) {
    try {
        var cpp = require(nativeModule +'phplike' );
    } catch (e) {
        console.log("Got Exception. \nThis library could not be loaded, please recompile it.");
    }
} else {
    try {
        var cpp = require(parentPath + '/node_modules/bindings')({'bindings': 'phplike', 'module_root': parentPath + '/'});
    } catch (e) {

    }
}

var casting = require("./casting_type.js");
var core = require("./core.js");
var phplikeArray = require("./array.js");



// http://php.net/manual/en/function.curl-setopt.php

/*
* phplikeCppCurl only support the precise type of variable, So it must to reformat the value of variable.
*/

function reformatCurlData(curl) {//{{{
    var i, n, param2;
    var url, param, pos, urlParam, urlParamSplit, formatCurl;
    formatCurl = core.clone(curl);
    url = curl.url;
    pos = url.indexOf("?");
    if (pos != -1) {
        urlParam = url.substring(pos + 1);
        param = core.parse_str(urlParam);
        formatCurl.url = url.substring(0, pos);

        if (casting.is_string(curl.param)) {
            param2 = core.parse_str(curl.param);
        } else if (casting.is_object(curl.param)) {
            param2 = curl.param;
        }

        formatCurl.param = phplikeArray.array_merge(param, param2);
    }

    return formatCurl;

};//}}}

function responseHeaderToHash(str) {//{{{
    if (!str || !casting.is_string(str)) {
        return "";
    }
    var res = {}, regStatus, regRes;
    var strAy = str.split(/[\n\r]+/);
    var i, text, key, value, pos;
    regStatus = /HTTPs?\/[^\s]+[\s]([0-9]+)[\s].*/i;
    for (i in strAy) {
        text = strAy[i];
        pos = text.indexOf(": ");
        if (pos === -1) {
            regRes = text.match(regStatus);
            if (regRes && regRes[1]) {
                res['status'] = regRes[1];
                res['httpCode'] = regRes[0];
                continue;
            }
        }

        key = text.substring(0, pos);
        value = text.substring(pos + 2, text.length);
        if (!core.empty(key)) {
            if (!core.empty(res[key])) {
                if (!casting.is_array(res[key])) {
                    res[key] = [res[key]];
                } 
                res[key].push(value);
            } else {
                res[key] = value;
            }
        }
    }
    return res;
}//}}}

/**
 * If a value of parameter is start from '@', then it will be a file and will be upload.
 *
 */
function parseFileInfo (val) {
    var fileName,filePath, pos;
    if (val.indexOf('@') !== 0) {
        return false;
    }
  
    filePath = val.replace(/^@/, '');
    pos = val.lastIndexOf('/');
    if (pos === -1) {
        fileName = filePath;
    } else {
        fileName = val.substring(pos + 1, val.length);
    }
    if (!fs.existsSync(filePath)) {
        return "";
    }
    return [fileName, filePath];
}

exports.curl_init = function () {
    return {
        "url": "",
        "method": "GET",
        "param": {},
        "header": {},
        "options": {}
    };
};

exports.curl_setopt = function (curl, option, value) {
    var i ,n, param;
    option = option.replace(/[^0-9a-z\_\-\.]+/i, '');
    switch (option) {
        case 'CURLOPT_HTTPGET':
            if (value) curl.method = "GET";
            break;
        case 'CURLOPT_POST':
            if (value) curl.method= "POST";
            break;
        case 'CURLOPT_POSTFIELDS':
            if (casting.is_string(value)) {
                curl.param = core.parse_str(value);
            } else if (casting.is_object(value)) {
                curl.param = value;
            }
            break;
        case 'CURLOPT_URL':
            curl.url = value;
            break;
        case 'CURLOPT_HTTPHEADER':
            curl.header = value;
            break;
        default:
            curl.options[option] = value;
            break;
    }
};

exports.curl_close = function (curl) {
    delete curl;
};

exports.curl_exec = function (curlInput) {
    var key, fileParseResult, curl = reformatCurlData(curlInput);
    var fileUpload = {};

    if (curl.param instanceof Object) {
        for (key in curl.param) {
            val = curl.param[key];
            fileParseResult = parseFileInfo(val);
            if (fileParseResult) {
                delete curl.param[key];
                fileUpload[key] = fileParseResult[1];
            }
        }
    }

    var response = this.request(curl.method, curl.url, curl.param, curl.header, curl.options, fileUpload);
    curlInput.header = cpp.nodeCurlGetHeader();
    return response

};

exports.request = function (method, url, param, header, options, fileUpload) {
    var key;
    if (!options) {options = [];}
    if (!fileUpload) {
        fileUpload = [];
    } else {
        for (key in fileUpload) {
            fileUpload[key] = ["null", fileUpload[key]];
        }
    }
    var response =  cpp.request(method, url, param, header, options, fileUpload);
    return response;

};

exports.getResponseHeader = function () {
    return responseHeaderToHash(cpp.nodeCurlGetHeader());
};

if (typeof(UNIT_TEST) != "undefined" && UNIT_TEST === true) {
    exports.reformatCurlData = reformatCurlData;
    exports.responseHeaderToHash = responseHeaderToHash;
    exports.parseFileInfo = parseFileInfo;
}
