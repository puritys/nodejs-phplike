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


describe('Test method: HTTP GET  curl_exec', function() {

    it('Request', function() {
        var url = "https://www.google.com.tw/search?q=php+unit+test";
        var header = {"Cookie": "xxx"};

        var c = phplikeMod.curl_init();
        phplikeMod.curl_setopt(c, 'CURLOPT_URL', url);
        var res = phplikeMod.curl_exec(c);
        phplikeMod.curl_close(c);
        //console.log(res);
        var match = res.match(/unit/);
        assert.equal("unit", match[0]);
    });


});

describe('Test method: curl_setopt', function() {

    it('CURLOPT_POSTFIELDS - input a string', function() {

        var c = phplikeMod.curl_init();
        phplikeMod.curl_setopt(c, 'CURLOPT_POSTFIELDS', "a=b&c=d");
        assert.equal("b", c.param["a"]);
        assert.equal("d", c.param["c"]);
    });

    it('CURLOPT_POSTFIELDS - input a object', function() {

        var c = phplikeMod.curl_init();
        phplikeMod.curl_setopt(c, 'CURLOPT_POSTFIELDS', {"a": "b", "c": "d"});
        assert.equal("b", c.param["a"]);
        assert.equal("d", c.param["c"]);
    });

    it('CURLOPT_POST', function() {
        var c = phplikeMod.curl_init();
        phplikeMod.curl_setopt(c, 'CURLOPT_POST', 1);
        assert.equal("POST", c.method);
    });

    it('CURLOPT_HTTPGET', function() {
        var c = phplikeMod.curl_init();
        phplikeMod.curl_setopt(c, 'CURLOPT_HTTPGET', 1);
        assert.equal("GET", c.method);
    });

    it('CURLOPT_HTTPHEADER', function() {
        var c = phplikeMod.curl_init();
        phplikeMod.curl_setopt(c, 'CURLOPT_HTTPHEADER', {"Cookie": "test"});
        assert.equal("test", c.header['Cookie']);
    });

    it('CURLOPT default option', function() {
        var c = phplikeMod.curl_init();
        phplikeMod.curl_setopt(c, 'CURLOPT_UNKNOW', "test");
        assert.equal("test", c.options['CURLOPT_UNKNOW']);
    });


});



describe('Test method: reformatCurlData', function() {

    it('get param from url', function() {
        var c = phplikeMod.curl_init();
        var url = "http://www.google.com.tw/?a=b&a1=cc";
        c.url = url;
        c.param = "c=d&c1=dd";
        var res = phplikeMod.reformatCurlData(c);
        assert.equal("b", res.param["a"]);
        assert.equal("d", res.param["c"]);
        assert.equal("cc", res.param["a1"]);
        assert.equal("dd", res.param["c1"]);
        assert.equal("http://www.google.com.tw/", res.url);
        assert.equal(url, c.url);



    });

    it('get param from url and merge param which type is object', function() {
        var c = phplikeMod.curl_init();
        c.url = "http://www.google.com.tw/?a=b&a1=cc";
        c.param = {"c": "d", "c1": "dd"};
        var res = phplikeMod.reformatCurlData(c);
        assert.equal("b", res.param["a"]);
        assert.equal("d", res.param["c"]);
        assert.equal("cc", res.param["a1"]);
        assert.equal("dd", res.param["c1"]);

    });

});


