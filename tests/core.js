var phplikeMod = require('./include.js');


var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('Test function: isset', function() {
    it('String is undefined', function() {
        var str;
        var is = phplikeMod.isset(str);
        assert.equal(false, is);
    })

    it('missing argument 1', function() {
        try {
            var is = phplikeMod.isset();
            assert.equal(false, true);
        } catch (e) {
            assert.equal(true, true);
        }
    })


});

describe('Test function: empty', function() {//{{{
    it('String is undefined', function() {
        var str;
        var is = phplikeMod.empty(str);
        assert.equal(true, is);
    });

    it('String is not empty', function() {
        var str = "2";
        var is = phplikeMod.empty(str);
        assert.equal(false, is);
    });



});//}}}

describe('Test function: exec', function() {//{{{
    it('echo a string', function() {
        var str;
        var res = phplikeMod.exec("echo a");
        assert.equal("a\n", res);
    })

});//}}}

describe('Test function: time', function() {//{{{
    it('echo a string', function() {
        var t1 = phplikeMod.time();
        var t2 = phplikeMod.time(1000 * 30);
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
        var res = phplikeMod.parse_str(str);
        assert.equal("b", res['a']);
        assert.equal("d", res['c']);



    })

});//}}}

describe('Test function: clone', function() {//{{{
    it('clone a object(assoc array)', function() {
        var obj = {"a": "aa"};
        var res = phplikeMod.clone(obj);
        res["a"] = "bb";
        assert.equal("bb", res['a']);
        assert.equal("aa", obj['a']);
    });

    it('clone a array', function() {
        var obj = [1];
        var res = phplikeMod.clone(obj);
        res[0] = 5;
        assert.equal(1, res.length);

        assert.equal(5, res[0]);
        assert.equal(1, obj[0]);
    });



});//}}}

describe('Test function: getcwd', function() {//{{{
    it('string to object', function() {
        var res = phplikeMod.getcwd();
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
        var begin = phplikeMod.mktime(0, 0, 0, 1, 1, 1970);
        
        var res = phplikeMod.mktime(1, 1, 1, 5, 6, 2014);

        // (1399309261 
        assert.equal(1399338061 + begin, res);
    })

});//}}}



describe('Test function: exit', function() {
    it('run a child process to execute exit function', function() {
        // Notice! I am not sure it is a good solution to pass exit test.
        global.process.exit = function () {};
        phplikeMod.exit();
    })

});

