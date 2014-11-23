var phplikeMod = require('./include.js');


var assert = require("assert");

//mocha lib/ --grep _get
describe('file is exist', function() {
    var d = phplikeMod.readdir("/home/puritys");
    it('is_file', function() {
        var isFile = phplikeMod.is_file("file.js");
        assert.equal(true, isFile);
    })

    it('is dir', function() {
        var isDir = phplikeMod.is_dir("../tests");
        assert.equal(true, isDir);
    })

});

describe('file handle', function () {

    it('read file', function () {
        var content = phplikeMod.file_get_contents("file.js");
        var conetnt = phplikeMod.substr(content, 0, 30);
        if (!phplikeMod.empty(content)) {
            assert.equal(true, true);
        } else {
            assert.equal(true, false);
        }

    });

    it('write file', function () {
        phplikeMod.file_put_contents("tmp", "test");
        var content = phplikeMod.file_get_contents("tmp");
        assert.equal("test", content);
    });

    it('delete file', function () {
        phplikeMod.file_put_contents("tmp", "test");
        var content = phplikeMod.file_get_contents("tmp");
        phplikeMod.unlink("tmp");
        var isFile = !phplikeMod.is_file("tmp");
        assert.equal(true, isFile);
        
    });

});

describe('dir handle', function () {

    var dir = "test/55/b/c"; 
    it('create dir', function () {
        phplikeMod.mkdir(dir);
        var isDir = phplikeMod.is_dir(dir);
        assert.equal(true, isDir);
    });

    it('delete dir - force', function() {
        var isForce = true;
        phplikeMod.rmdir("test", isForce);
        isDir = phplikeMod.is_dir(dir);
        assert.equal(false, isDir);


    });

});

