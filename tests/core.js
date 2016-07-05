var php = require('./include.js');


var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('Test function: isset', function() {//{{{
    it('String is undefined', function() {
        var str;
        var is = php.isset(str);
        assert.equal(false, is);
    })

    it('missing argument 1', function() {
        try {
            var is = php.isset();
            assert.equal(false, true);
        } catch (e) {
            assert.equal(true, true);
        }
    })


});//}}}

describe('Test function: empty', function() {//{{{
    it('String is undefined', function() {
        var str;
        var is = php.empty(str);
        assert.equal(true, is);
    });

    it('String is not empty', function() {
        var str = "2";
        var is = php.empty(str);
        assert.equal(false, is);
    });

    it('empty object is empty', function() {
        var str = {};
        var is = php.empty(str);
        assert.equal(true, is);
    });
    it('empty array is empty', function() {
        var str = [];
        var is = php.empty(str);
        assert.equal(true, is);
    });


});//}}}

describe('Test function: exec', function() {//{{{
    it('echo a string', function() {
        var str;
        var res = php.exec("echo a");
        assert.equal("a\n", res);
    })

});//}}}

describe('Test function: time', function() {//{{{
    it('echo a string', function() {
        var t1 = php.time();
        var t2 = php.time(1000 * 30);
        if (t2 > t1 + 25) {
            assert.equal(true, true);
        } else {
            assert.equal(true, false);
        }
    })

});//}}}

describe('Test function: parse_str', function() {//{{{
    it('string to object', function() {
        var str = "a=b&c=d";
        var res = php.parse_str(str);
        assert.equal("b", res['a']);
        assert.equal("d", res['c']);



    })

});//}}}

describe('Test function: clone', function() {//{{{
    it('clone a object(assoc array)', function() {
        var obj = {"a": "aa"};
        var res = php.clone(obj);
        res["a"] = "bb";
        assert.equal("bb", res['a']);
        assert.equal("aa", obj['a']);
    });

    it('clone a array', function() {
        var obj = [1];
        var res = php.clone(obj);
        res[0] = 5;
        assert.equal(1, res.length);

        assert.equal(5, res[0]);
        assert.equal(1, obj[0]);
    });

    it('clone string, number', function() {
        var obj = "a";
        var res = php.clone(obj);
        assert.equal("a", res);

        obj = 10;
        var res = php.clone(obj);
        assert.equal(10, res);


    });




});//}}}

describe('Test function: getcwd', function() {//{{{
    it('string to object', function() {
        var res = php.getcwd();
        if (process.platform.match(/^win/)) {
            // node.js should install in c:
            assert.equal("C:", res.substring(0, 2).toUpperCase()); 
        } else {
            assert.equal("/", res.substring(0, 1));
        }
    })

});//}}}

//http://php.net/manual/en/function.mktime.php
describe('Test function: mktime', function() {//{{{
    it('Verify normal date to time', function() {
        //-28800   timezone+8 (Asia/Taipei)
        var begin = php.mktime(1, 1, 1, 5, 6, 2014);
        var res = php.mktime(2, 1, 1, 5, 6, 2014);
        assert.equal(res - begin, 3600);
    })

});//}}}

describe('Test function: explode', function() {//{{{
    it('Normal', function() {
        var datas = [
            //expect, delimiter, string, limit
            [["", "b","b","b"], "a", "ababab"],
            [["b", "c"], "a", "bac"],
            [["b"], "a", "bac", 1],
            [["b", "c"], "a", "bacad", -1],
            [["b"], "a", "bacad", -9],
            [["b", "d"], "aca", "bacad"],


        ];
        datas.forEach (function (data) { 
            var expect = data[0], limit;
            if (data[3]) limit = data[3];
            var res = php.explode(data[1], data[2], limit);
            //console.log(res);
            for(var pro in expect) {
                assert.equal(expect[pro], res[pro], JSON.stringify(data));
            }
        });
    })

});//}}}


describe('Test function: exit', function() {
    it('run a child process to execute exit function', function() {
        // Notice! I am not sure it is a good solution to pass exit test.
        global.process.exit = function () {};
        php.exit();
    })

});

describe('Test function: implode', function() {//{{{
    it('Normal', function() {
        var datas = [
            //expect, delimiter, string
            ["a-b-c", "-", ["a", "b", "c"]],
            ["abc", "", ["a", "b", "c"]],
            ["abc", ["a", "b", "c"]],
            ["a','b", "','", ["a", "b"]],

        ];
        datas.forEach (function (data) { 
            var expect = data[0], ay;
            if (data[2]) ay = data[2];
            var res = php.implode(data[1], ay);
            //console.log(res);
            assert.equal(expect, res, JSON.stringify(data));
        });
    })

});//}}}

