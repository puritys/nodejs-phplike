var phplikeMod = require('./include.js');


var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('Test function: isset', function() {
    it('String is undefined', function() {
        var str;
        var is = phplikeMod.isset(str);
        assert.equal(false, is);
    })

});

