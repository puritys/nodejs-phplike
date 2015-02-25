var php = require('./include.js');

var assert = require("assert");

//mocha lib/ --grep _get
describe('Test: parse simple XML', function() {

    it('Load xml file', function() {
        var doc = new php.DOMDocument();
        var result = doc.load("tests/data/test.xml");
        //console.log(result);
        //console.log(result['childNodes'][2]['childNodes']);
        //console.log(result['childNodes'][0]['attributes']);
        assert.equal('red', result['childNodes'][2]['childNodes'][0]['value']);
        assert.equal('product', result['childNodes'][0]['attributes']['class']);
    })

    it('Load xml content', function() {
        var XML = ['<product>',
                  '<name class="product" style="margin: 10px" alt="test">product name</name>',
                '<description>desc</description>',
                '<color>',
                '    <item>red</item>',
                '    <item>green</item>',
                '</color>',
                '</product>'].join("\n");
        var doc = new php.DOMDocument();
        var result = doc.loadXML(XML);
        //console.log(result);
        //console.log(result['childNodes'][2]['childNodes']);
        //console.log(result['childNodes'][0]['attributes']);
        assert.equal('red', result['childNodes'][2]['childNodes'][0]['value']);
        assert.equal('product', result['childNodes'][0]['attributes']['class']);
    })


});


