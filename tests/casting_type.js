var php = require('./include.js');
var assert = require("assert");

//mocha lib/ --grep mthod_get
describe('Test function: is_array', function() {
    it('is a array', function() {
        var a = ["a", "b"];
        var is = php.is_array(a);
        assert.equal(true, is);
    });

    it('object is not a array', function() {
        var a = {};
        var is = php.is_array(a);
        assert.equal(false, is);
    });

    it('function is not a array', function() {
        var a = function () {return "a"};
        var is = php.is_array(a);
        assert.equal(false, is);
    });


});

describe('Test function: is_numeric', function() {
    it(' 2 is a numeric', function() {
        var a = 2;
        var is = php.is_numeric(a);
        assert.equal(true, is);
    });

    it('2.1 is a numeric', function() {
        var a = 2.1;
        var is = php.is_numeric(a);
        assert.equal(true, is);
    });

    it('Number() is a numeric', function() {
        var a = new Number(2);
        var is = php.is_numeric(a);
        assert.equal(true, is);
    });

    it('function is not a numeric', function() {
        var a = function () {return "a"};
        var is = php.is_array(a);
        assert.equal(false, is);
    });

    it('"2" is not a numeric', function() {
        var a = "2";
        var is = php.is_array(a);
        assert.equal(false, is);
    });




});


describe('Test function: is_object', function() {
    it('Normal', function() {
        var a = {"a":"a"};
        var is = php.is_object(a);
        assert.equal(true, is);
    });

    it('array is not a object', function() {
        var a = ["a", "b"];
        var is = php.is_object(a);
        assert.equal(false, is);
    });

});


