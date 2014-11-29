var phplikeMod = require('./include.js');
var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('base64', function() {
    var text = "text";
    var encodeText = "dGV4dA==";
    it('encode', function() {
        var res = phplikeMod.base64_encode(text);
        assert.equal(encodeText, res);
    });

    it('decode', function() {
        var res = phplikeMod.base64_decode(encodeText);
        assert.equal(text, res);
    });

});


describe('urlencode', function() {
    var text = "a+";
    var encodeText = "a%2B";
    it('encode', function() {
        var res = phplikeMod.urlencode(text);
        assert.equal(encodeText, res);
    });

    it('decode', function() {
        var res = phplikeMod.urldecode(encodeText);
        assert.equal(text, res);
    });

});


