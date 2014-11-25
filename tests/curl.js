var phplikeMod = require('./include.js');


var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('Test method: HTTP GET ', function() {
    it('Fetch google response with query string', function() {
        var url = "https://www.google.com.tw/search";
        var param = {"q": "unit test"};
        var header = {};
        var res = phplikeMod.request("GET", url, param, {});

        //console.log(res);
        var match = res.match(/unit/);
        assert.equal("unit", match[0]);
    });
});

//describe('Test method: HTTP GET with header', function() {
//
//    it('Request with header', function() {
//        var url = "http://www.puritys.me:8080/";
//        var param = {"q": "x"};
//        var header = {"Cookie": "xxx"};
//        var res = phplikeMod.request("GET", url, param, header);
//
//        //console.log(res);
//        var match = res.match(/unit/);
//        assert.equal("unit", match[0]);
//    });
//
//
//});

describe('Test method: HTTP GET  curl_exec', function() {

    it('Request', function() {
        var url = "https://www.google.com.tw/search?q=php+unit+test";
        var header = {"Cookie": "xxx"};

        var c = phplikeMod.curl_init();
        phplikeMod.curl_setopt(c, 'CURLOPT_URL', url);
        var res = phplikeMod.curl_exec(c);
        phplikeMod.curl_close(c);
        console.log(res);
        var match = res.match(/unit/);
        assert.equal("unit", match[0]);
    });


});
