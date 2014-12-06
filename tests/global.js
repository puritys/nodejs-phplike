// global function test and test the phplike module which has already installed.

//global.UNIT_TEST = true;
require('phplike');

var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('Test global function: array_merge', function() {
    it('merge two array', function() {
        var arr1 = [1], arr2 = [2];
        var res = array_merge(arr1, arr2);
        assert.equal(1, res[0]);
        assert.equal(2, res[1]);
        assert.equal("undefined", typeof(arr1[1]));

    });
});

describe('Test global function: core function', function() {
    it('exec', function() {
        var command = 'echo a';
        var res = exec(command);
        assert.equal("a\n", res);
    });
    it('base64_encode', function() {
        var str = "test";
        var res = base64_encode(str);
        assert.equal("dGVzdA==", res);
    });

});

describe('Test global function: is_dir', function() {
    it('File is not a dir.', function() {
        var file = 'tests/global.js';
        var res = is_dir(file);
        assert.equal(false, res);
    });

});


