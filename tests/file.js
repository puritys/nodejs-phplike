var phplikeMod = require('./include.js');


var assert = require("assert");

//mocha lib/ --grep _get
describe('Test function: is_file, file.js', function() {
    //var d = phplikeMod.readdir("/home/puritys");
    it('Test file is exist.', function() {
        var isFile = phplikeMod.is_file("./tests/file.js");
        assert.equal(true, isFile);
    })

    it('Test file is not exist.', function() {
        var isFile = phplikeMod.is_file("./xxxxxxxxxxxxxxx");
        assert.equal(false, isFile);
    })


});

describe('Test function: is_dir, file.js', function () {
    it('Test directory is exist.', function() {
        var isDir = phplikeMod.is_dir("tests");
        assert.equal(true, isDir);
    })

});

describe('File Handle', function () {

    it('read file', function () {
        var content = phplikeMod.file_get_contents("./tests/file.js");
        var conetnt = phplikeMod.substr(content, 0, 30);
        if (!phplikeMod.empty(content)) {
            assert.equal(true, true);
        } else {
            assert.equal(true, false);
        }

    });

    it('write file', function () {
        phplikeMod.file_put_contents("./tests/tmp", "test");
        var content = phplikeMod.file_get_contents("./tests/tmp");
        assert.equal("test", content);
    });

    it('delete file', function () {
        phplikeMod.file_put_contents("./tests/tmp", "test");
        var content = phplikeMod.file_get_contents("./tests/tmp");
        phplikeMod.unlink("./tests/tmp");
        var isFile = !phplikeMod.is_file("./tests/tmp");
        assert.equal(true, isFile);
        
    });

});

describe('dir handle', function () {

    var dir = "./tests/test/55/b/c"; 
    it('create dir', function () {
        phplikeMod.mkdir(dir);
        var isDir = phplikeMod.is_dir(dir);
        assert.equal(true, isDir);
    });

    it('delete dir - force', function() {
        var isForce = true;
        phplikeMod.rmdir("./tests/test", isForce);
        isDir = phplikeMod.is_dir(dir);
        assert.equal(false, isDir);


    });

});

