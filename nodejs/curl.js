var path = require('path');
var parentPath = path.dirname(__filename) + '/..';

var phplikeCpp  = require(parentPath + '/node_modules/bindings')({'bindings': 'phplike', 'module_root': parentPath + '/'});
//var phplikeCpp = require("./../build/Release/phplike");

var casting = require("./casting_type.js");
var core = require("./core.js");
var phplikeArray = require("./array.js");



// http://php.net/manual/en/function.curl-setopt.php

/*
* phplikeCppCurl only support the precise type of variable, So it must to reformat the value of variable.
*/

function reformatCurlData(curl) {
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

};

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
    var curl = reformatCurlData(curlInput);

    return phplikeCpp.request(curl.method, curl.url, curl.param, curl.header);

};

if (typeof(UNIT_TEST) != "undefined" && UNIT_TEST === true) {
    exports.reformatCurlData = reformatCurlData;
}
