var phplikeCpp = require("./../build/Release/phplike");

exports.curl_init = function () {
    return {
        "url": "",
        "method": "GET",
        "param": {},
        "header": {},
        "cookie": {}
    };
};

exports.curl_setopt = function (curl, option, value) {
    option = option.replace(/[^0-9a-z\_\-\.]+/i, '');
    switch (option) {
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


