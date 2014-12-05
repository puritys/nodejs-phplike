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
    var resBody, resHeader;
    before(function(){
        var url = "https://www.google.com.tw/search?q=php+unit+test";
        var header = {"Cookie": "xxx"};
        var c = phplikeMod.curl_init();
        phplikeMod.curl_setopt(c, 'CURLOPT_URL', url);
        resBody = phplikeMod.curl_exec(c);
        resHeader = phplikeMod.getResponseHeader();
        phplikeMod.curl_close(c);
    })

    it('Request', function() {
        var match = resBody.match(/unit/);
        assert.equal("unit", match[0]);
        //

    });

    it('Header Handle', function() {
        assert.equal("-1", resHeader["Expires"]);

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

describe('Test method: responseHeaderToHash', function() {

    it('get header', function() {
        var header = ["HTTP/1.1 200 OK",
                      "Date: Fri, 05 Dec 2014 05:11:18 GMT",
                      "Expires: -1",
                      "Cache-Control: private, max-age=0",
                      "Content-Type: text/html; charset=Big5",
                      "Set-Cookie: PREF=ID=43",
                      "Set-Cookie: NIGbEEw; HttpOnly"];

        var res = phplikeMod.responseHeaderToHash(header.join("\n\r"));
        assert.equal("Fri, 05 Dec 2014 05:11:18 GMT", res['Date']);
        assert.equal("-1", res['Expires']);
        assert.equal("private, max-age=0", res['Cache-Control']);
        assert.equal("text/html; charset=Big5", res['Content-Type']);
        assert.equal("PREF=ID=43", res['Set-Cookie'][0]);
        assert.equal("NIGbEEw; HttpOnly", res['Set-Cookie'][1]);

    });

});

