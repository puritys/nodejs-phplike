var phplikeCpp = require("./../build/Release/phplike");
var casting = require("./casting_type.js");
// http://php.net/manual/en/function.curl-setopt.php


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
                param = {};
                var split = value.split(/&/);
                n = split.length;
                for (i = 0; i < n; i++) {
                    var pos = split[i].indexOf('=');
                    if (!pos) continue;
                    param[split[i].substring(0, pos)] = split[i].substring(pos + 1);
                }
                curl.param = param;
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

exports.curl_exec = function (curl) {
    return phplikeCpp.request(curl.method, curl.url, curl.param, curl.header);

};


