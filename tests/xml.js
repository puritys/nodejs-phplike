var php = require('./include.js');

var assert = require("assert");

//mocha lib/ --grep _get
describe('Test: parse simple XML', function() {

    it('Load xml', function() {

        var doc = new php.DOMDocument();
        var result = doc.load("data/test.xml");
        //console.log(result);
        //console.log(result['children'][2]['children']);
        assert.equal('red', result['children'][2]['children'][0]['value']);
    })

});

