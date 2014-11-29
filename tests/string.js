var phplikeMod = require('./include.js');


var assert = require("assert");

//mocha lib/ --grep _get
describe('String Handler:', function() {
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

describe('Test function: str_pad', function() {

    it("Fill up zero into date", function () {
        var month = phplikeMod.str_pad(1, 2, "0", "left");
        assert.equal("01", month);

        month = phplikeMod.str_pad(11, 2, "0", "left");
        assert.equal("11", month);


    });

    it("Fill up text into right side", function () {
        var text = phplikeMod.str_pad("b", 10, "c", "right");
        assert.equal("bccccccccc", text);


    });

    it("Fill up text into both side", function () {
        var text = phplikeMod.str_pad("b", 10, "c", "both");
        assert.equal("ccccbccccc", text);
    });

});

describe('Test function: String to  integer convertion', function() {

    it("intval, string 55 to int 55", function () {
        var num = phplikeMod.intval("55");
        assert.equal(55, num);
    });

    it("intval, string a55a to int 55", function () {
        var num = phplikeMod.intval("a55a");
        assert.equal(55, num);
    });

    it("intval, string 05 to int 5", function () {
        var num = phplikeMod.intval("05");
        assert.equal(5, num);
    });

    it("intval, string a55a2 to int 55", function () {
        var num = phplikeMod.intval("a55a2");
        assert.equal(55, num);
    });
});

describe('Test function: integer to string convertion', function() {

    it("strval, int 55 to string '55'", function () {
        var num = phplikeMod.strval(55);
        assert.equal("55", num);
    });

    it("strval, int 0 to string '0'", function () {
        var num = phplikeMod.strval(0);
        assert.equal("0", num);
    });

    it("strval, array  to string ", function () {
        var num = phplikeMod.strval([3, 5]);
        assert.equal("3,5", num);
    });

});


