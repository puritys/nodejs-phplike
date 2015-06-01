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

describe('Test method: array_rand', function() {
    it('Normal', function() {
        var data, res;
        data = ["a", "b", "c"];
        for (var i = 0; i< 10 ; i++) {
            res = php.array_rand(data);
            if (res >= 3) assert.equal(false, true, "the return value should small than 3.");
            assert.equal(1, res.toString().length);
        }
    });

    it('Multi return value', function() {
        var data, res;
        datas = [
            [3, 3, ["a", "b", "c"]],
            [2, 2, ["a", "b", "c"]],
            [4, 4, ["a", "b", "c", "d"]],
            [4, 7, ["a", "b", "c", "d"]]
        ]
        datas.forEach(function (data) {
            var len, expect;
            len = data[1];
            expect = data[0];
            res = php.array_rand(data[2], len);
            if (res > len) assert.equal(false, true, "the return value should small than 3.");
            assert.equal(expect, res.length);
        });
    });

    it('Wrong input', function() {
        var data, res;
        datas = [
            ["", 1, []]
        ]
        datas.forEach(function (data) {
            var len, expect;
            expect = data[0];
            len = data[1];
            res = php.array_rand(data[2], len);
            assert.equal(expect, res);
        });
    });


});




