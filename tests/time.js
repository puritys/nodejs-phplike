var phplikeMod = require('./include.js');
var assert = require("assert");

//mocha lib/ --grep _get
describe('timestamp ', function() {
    it('Test method time', function() {
        var t = phplikeMod.time();
        if (t > 0) {
            assert.equal(true, true);
        } else {
            assert.equal(true, false);
        }
    })

    it('Test method date - get Y/m/d', function() {
        var d = phplikeMod.date("Y/m/d");
        var reg = /[0-9]{4,4}\/[0-9]{2,2}\/[0-9]{2,2}/;
        if (d.match(reg)) {
            assert.equal(true, true);
        } else {
            assert.equal(true, false);
        }
    });

    it('Test method date - input timestamp', function() {
        var d = phplikeMod.date("Ym", 1386008617);
        assert.equal("201312", d);
    })





});


