var php = require('./include.js');
var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('Test method: array_merge', function() {
    it('merge index array', function() {
        var arr1 = [1], arr2 = [2];
        var res = php.array_merge(arr1, arr2);
        assert.equal(1, res[0]);
        assert.equal(2, res[1]);
        assert.equal("undefined", typeof(arr1[1]));


    });
    it('merge assoc array', function() {
        var arr1 = {"a": "b"}, arr2 = {"c": "d"};
        var res = php.array_merge(arr1, arr2);

        assert.equal("b", res["a"]);
        assert.equal("d", res["c"]);
        assert.equal("undefined", typeof(arr1["c"]));


    });
});

describe('Test method: shuffle', function() {
    it('Normal', function() {
        var data, res;
        data = ["a", "b", "c"];
        res = php.shuffle(data);
        res = res.join("");
        assert.equal(3, res.length);
        var t = res.match(/a/);
        if (t) {assert.equal(true, true);
        } else {assert.equal(false, true);}

        t = res.match(/b/);
        if (t) {assert.equal(true, true);
        } else {assert.equal(false, true);}
    });
    it('Associcative array', function() {
        var data, res, length = 0, key;
        data = {"a": "a", "b": "b", "c": "c"};
        res = php.shuffle(data);
        //console.log(res);
        for(key in res) {length++;};
        assert.equal(3, length);
        assert.equal("a", res.a);
        assert.equal("b", res.b);
        assert.equal("c", res.c);
    });



});

