var assert = require("assert");

var phpCpp = require('./../../binary/linux_ia32/phplike');
//mocha lib/ --grep mthod_get
describe('Test win32 ia32', function() {
    it('test', function() {
        var res = phpCpp.exec("echo a");
        assert.equal("a\n", res);
    });
});
