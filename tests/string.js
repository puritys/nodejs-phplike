var phplikeMod = require('./include.js');


var assert = require("assert");

//mocha lib/ --grep _get
describe('string handler:', function() {
    var d = phplikeMod.readdir("/home/puritys");
    it('Test method ord - success', function() {
        var text = phplikeMod.ord("a");
        assert.equal(97, text);
    });

    it('Test method ord - input is not a string, it will return empty.', function() {
        var text = phplikeMod.ord(12);
        assert.equal("", text);
    });



    it('Test method chr - success', function() {
        var text = phplikeMod.chr(97);
        assert.equal("a", text);
    });

    it('Test method chr - input is not a integer, it will return empty.', function() {
        var text = phplikeMod.chr("aa");
        assert.equal("", text);
    });


    it('Test method decbin - success.', function() {
        var text = phplikeMod.decbin(82);
        assert.equal("1010010", text);
    });
    it('Test method bindec - success.', function() {
        var text = phplikeMod.bindec("1010010");
        assert.equal(82, text);
    });




});


