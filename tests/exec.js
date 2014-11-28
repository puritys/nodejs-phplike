var phplikeMod = require('./include.js');


var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('Test function: exec', function() {
    it('Echo string', function() {
        var str = "";
        for (var i = 0; i < 10; i++) {
            str += "1";
        }
        var printInScreen = false;
        var res = phplikeMod.exec("echo " + str + "", printInScreen);
        assert.equal("1111111111\n", res);
    })

});

describe('Test function: system', function() {
    it('Echo string', function() {
        var str = "";
        for (var i = 0; i < 10; i++) {
            str += "1";
        }
        var printInScreen = false;
        var res = phplikeMod.system("echo " + str + "", printInScreen);
        assert.equal("1111111111\n", res);
    })

});




