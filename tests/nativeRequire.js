var assert = require("assert");
var file = require("./../nodejs/file.js");

var fs = require("fs");
var path = require('path');
var parentPath = path.dirname(__filename) + '/..';
var nativeModule = parentPath + "/binary/tmp";

file.mkdir(nativeModule);
fs.writeFileSync(nativeModule + "/phplike.node", "");
 
describe('Test: load native module fail', function() {
    it('core.js', function() { 

        try {
            var core = require('./../nodejs/core.js');
            assert.equal(true, false);
        } catch (e) {
            assert.equal(true, true);
        }
    })

});

describe('Test: load native module fail', function() {
    it('curl.js', function() { 

        try {
            var core = require('./../nodejs/curl.js');
            assert.equal(true, false);
        } catch (e) {
            assert.equal(true, true);
        }
    })

});

