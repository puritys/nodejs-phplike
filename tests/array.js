var phplikeMod = require('./include.js');
var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('Test method: array_merge', function() {
    it('merge index array', function() {
        var arr1 = [1], arr2 = [2];
        var res = phplikeMod.array_merge(arr1, arr2);
        assert.equal(1, res[0]);
        assert.equal(2, res[1]);
        assert.equal("undefined", typeof(arr1[1]));


    });
    it('merge assoc array', function() {
        var arr1 = {"a": "b"}, arr2 = {"c": "d"};
        var res = phplikeMod.array_merge(arr1, arr2);

        assert.equal("b", res["a"]);
        assert.equal("d", res["c"]);
        assert.equal("undefined", typeof(arr1["c"]));


    });


});


