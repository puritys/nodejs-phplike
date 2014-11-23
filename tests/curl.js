var phplikeMod = require('./include.js');


var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('curl_mthod_get', function() {
    it('Fetch google response', function() {
        var res = phplikeMod.requestGet("https://www.google.com.tw/");
        //console.log(res);
        var match = res.match(/window.google/);
        assert.equal("window.google", match[0]);
    })
});
