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
        //console.log(result['childNodes'][3]['childNodes']);


        assert.equal('product', result['name']);
        assert.equal('red', result['childNodes'][2]['childNodes'][0]['value']);
        assert.equal('item', result['childNodes'][2]['childNodes'][0]['name']);


        assert.equal('product', result['childNodes'][0]['attributes']['class']);

        assert.equal('a', result['childNodes'][3]['childNodes'][0]['value']);

    })

    it('Get empty tag', function() {
        var XML = ['<product>',
                  '<name></name>',
                '</product>'].join("\n");
        var doc = new php.DOMDocument();
        var result = doc.loadXML(XML);
        //console.log(result);
        assert.equal('name', result['childNodes'][0]['name']);
    });


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
    });


});

describe('Test: getElementsByTagName', function() {
    it('Simple', function() {
        var XML = ['<product>',
                  '<name class="product" style="margin: 10px" alt="test">product name</name>',
                '<description>desc</description>',
                '</product>'].join("\n");
        var doc = new php.DOMDocument();
        var result = doc.loadXML(XML);
        var nodes = doc.getElementsByTagName("name");
        //console.log(nodes);
        assert.equal('name', nodes[0].nodeName);

        nodes = doc.getElementsByTagName("product");
        //console.log(nodes);
        assert.equal('product', nodes[0].nodeName);

    });

    it('Get Multiple Tag', function() {
        var XML = ['<product>',
                  '<name>name1</name>',
                  '<name>name2</name>',
                  '<name>name3</name>',
                '</product>'].join("\n");
        var doc = new php.DOMDocument();
        var result = doc.loadXML(XML);
        var nodes = doc.getElementsByTagName("name");
        //console.log(nodes);
        assert.equal('name1', nodes[0].nodeValue);
        assert.equal('name2', nodes[1].nodeValue);
        assert.equal('name3', nodes[2].nodeValue);

        assert.equal('name', nodes[0].nodeName);
        assert.equal('name', nodes[1].nodeName);
        assert.equal('name', nodes[2].nodeName);
    });

    it('Get tag in deep level', function() {
        var XML = ['<product>',
                  '<a><b><c><name>value</name></c></b></a>',
                  '<d><name>value2</name></d>',
                '</product>'].join("\n");
        var doc = new php.DOMDocument();
        var result = doc.loadXML(XML);
        var nodes = doc.getElementsByTagName("name");
        //console.log(nodes);
        assert.equal('value', nodes[0].nodeValue);
        assert.equal('name', nodes[0].nodeName);

        assert.equal('value2', nodes[1].nodeValue);
        assert.equal('name', nodes[1].nodeName);


    });

});

describe('Test: element', function() {
    var XML = ['<product>',
              '<a>test <b class="x">b</b> zzz </a>',
            '</product>'].join("\n");
    var doc = new php.DOMDocument();
    doc.loadXML(XML);

    it("Get first child", function () {
        var nodes = doc.getElementsByTagName("a");
        var firstChild = nodes[0].firstChild;
        //console.log(nodes);
        //console.log(firstChild);
        assert.equal('test ', firstChild.nodeValue);
    });

    it("Get last child", function () {
        var nodes = doc.getElementsByTagName("a");
        var lastChild = nodes[0].lastChild;
        //console.log(nodes);
        assert.equal(' zzz ', lastChild.nodeValue);

    });

    it("should not has attribute", function () {
        var nodes = doc.getElementsByTagName("a");
        var hasAttr = nodes[0].hasAttributes();
        //console.log(nodes);
        assert.equal(false, hasAttr);
    });

    it("should has attribute", function () {
        var nodes = doc.getElementsByTagName("b");
        var hasAttr = nodes[0].hasAttributes();
        //console.log(nodes);
        assert.equal(true, hasAttr);
    });




});
 
