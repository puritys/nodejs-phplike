var phplikeMod = require('./include.js');


var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('exec', function() {
    it('test_exec', function() {
        var str = "";
        for (var i = 0; i < 10; i++) {
            str += "1";
        }
        var printInScreen = false;
        var res = phplikeMod.exec("echo '" + str + "'", printInScreen);
        assert.equal("1111111111\n", res);
    })

});

//var phplike = require ('./../nodejs/phplike');
//var phplike = require ('./../build/Release/phplike');



