var php = phplikeMod = require('./include.js');


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

describe('Test function: trim', function() {

    it("trim space", function () {
        var res = phplikeMod.trim("      aaa        ");
        assert.equal("aaa", res);
    });

    it("trim only space in before and after", function () {
        var res = phplikeMod.trim("      aa 2        ");
        assert.equal("aa 2", res);
    });

    it("trim space for number", function () {
        var res = phplikeMod.trim(123);
        assert.equal("123", res);
    });

    it("trim empty variable", function () {
        var res = phplikeMod.trim();
        assert.equal("", res);

        var res = phplikeMod.trim(undefined);
        assert.equal("", res);

        var res = phplikeMod.trim(null);
        assert.equal("", res);

        var res = phplikeMod.trim(0);
        assert.equal("", res);


    });



});

describe("Test sprintf:", function () {

    it("String", function () {
        var text = "This %s a %s";
        var str1 = "is";
        var str2 = "apple";
        var result = php.sprintf(text, str1, str2);
        assert.equal("This is a apple", result);

        text = "This %1\$s a %1\$s";
        result = php.sprintf(text, str1);
        assert.equal("This is a is", result);

    });

    it("ASCII", function () {
        var text = "A %c %c";
        var str1 = "97";
        var num = 98;
        var result = php.sprintf(text, str1, num);
        assert.equal("A a b", result);
    });


    it("Number", function () {
        var text = "This number is %.2f";
        var str = 100;
        var result = php.sprintf(text, str);
        assert.equal("This number is 100.00", result);

        str = 100.500;
        result = php.sprintf(text, str);
        assert.equal("This number is 100.50", result);

    });

    it("Number %i", function () {
        var text = "This number is %i";
        var str = 100.20;
        var result = php.sprintf(text, str);
        assert.equal("This number is 100", result);


    });

    it("Binary %b", function () {
        var text = "This number is %b";
        var str = 8;
        var result = php.sprintf(text, str);
        assert.equal("This number is 1000", result);


    });



});

describe("Test http_build_query:", function () {

    it("should be a=b%20c", function () {
        var param = {"a": "b c"};
        var expect = "a=b%20c";
        var result = php.http_build_query(param);
        assert.equal(expect, result);
    });

    it("should be a[]=b&a[]=c", function () {
        var param = {"a": ["b","c"]};
        var expect = "a[0]=b&a[1]=c";
        var result = php.http_build_query(param);
        assert.equal(expect, result);
    });

    it("should be a[b][0]=d", function () {
        var param = {"a": {"b": ["d"]}};
        var expect = "a[b][0]=d";
        var result = php.http_build_query(param);
        assert.equal(expect, result);
    });

});
