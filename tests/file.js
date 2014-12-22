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
    });

    it('File is not a dir.', function() {
        var file = 'tests/global.js';
        var res = phplikeMod.is_dir(file);
        assert.equal(false, res);
    });

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

    it('read a not exist file', function () {
        var content = phplikeMod.file_get_contents("./tests/file.jsxx");
        assert.equal("", content);

    });

    it('write file', function () {
        phplikeMod.file_put_contents("./tests/tmp", "test");
        var content = phplikeMod.file_get_contents("./tests/tmp");
        assert.equal("test", content);
    });

    it('write a binary content into file', function () {
        phplikeMod.file_put_contents("./tests/tmp2", "test", "binary");
        var content = phplikeMod.file_get_contents("./tests/tmp2");
        assert.equal("test", content);
        phplikeMod.unlink("./tests/tmp2");
    });

    it('delete file', function () {
        phplikeMod.file_put_contents("./tests/tmp", "test");
        var content = phplikeMod.file_get_contents("./tests/tmp");
        phplikeMod.unlink("./tests/tmp");
        var isFile = !phplikeMod.is_file("./tests/tmp");
        assert.equal(true, isFile);
        
    });

    it('read file content in binary', function () {
        var content = phplikeMod.file_get_contents("./tests/file.js", "binary");
        conetnt = phplikeMod.substr(content, 0, 30);
        if (!phplikeMod.empty(content)) {
            assert.equal(true, true);
        } else {
            assert.equal(true, false);
        }

    });

    it('function readfile', function () {
        var content = phplikeMod.readfile("./tests/file.js", "binary");
        conetnt = phplikeMod.substr(content, 0, 30);
        if (!phplikeMod.empty(content)) {
            assert.equal(true, true);
        } else {
            assert.equal(true, false);
        }

    });


});

describe('dir handle', function () {

    var dir = "./tests/test/55/b/c"; 
    it('create dir', function () {
        phplikeMod.mkdir(dir);
        var isDir = phplikeMod.is_dir(dir);
        assert.equal(true, isDir);
    });

    it('create single level dir', function () {
        phplikeMod.mkdir("test_dir");
        var isDir = phplikeMod.is_dir("test_dir");
        assert.equal(true, isDir);
        phplikeMod.rmdir("test_dir");
    });

    it('create dir from "/"', function () {
        var cwd = phplikeMod.getcwd();
        phplikeMod.mkdir(cwd + "/test_dir");
        var isDir = phplikeMod.is_dir(cwd + "/test_dir");
        assert.equal(true, isDir);
        phplikeMod.rmdir(cwd + "/test_dir");
    });

    it('get exception when create dir in no permission path.', function () {
        try {
            phplikeMod.mkdir("/admin");        
            assert.equal(false, true);
        } catch (e) {
            assert.equal(true, true);
        }
    });


    it('delete dir - force', function() {
        var isForce = true;
        phplikeMod.mkdir(dir);
        phplikeMod.file_put_contents(dir + "/tmp", "test");
        phplikeMod.rmdir("./tests/test", isForce);
        isDir = phplikeMod.is_dir(dir);
        assert.equal(false, isDir);


    });

});

