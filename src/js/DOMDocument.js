var DOMElementMod = require("./xml/DOMElement");
var cpp = require('./requireNative.js');


/**
 * DOMDocument
 */
function DOMDocument() {
    this.doc = new cpp.DOMDocument();
    this.json = "";
}

var o = DOMDocument.prototype;
o.doc = "";


o.load = function (file) {
    this.json = this.doc.load(file);
    return this.json;
};

o.loadXML = function (content) {
    try {
        this.json = this.doc.loadXML(content);
    } catch (e) {
        console.log(e);
    }
    return this.json;
};

o.getElementsByTagName = function (name) {
    var result = [], node, phpNode;

    if (this.json.name === name) {
        phpNode = new DOMElementMod(this.json);
        result.push(phpNode);
        return result;
    }
    var glob = function (childNodes, result) {
        for (var index in childNodes ) {
            node = childNodes[index];
            if (node.name === name) {
                phpNode = new DOMElementMod(node);
                result.push(phpNode);
            } else if (node.childNodes) {
                glob(node.childNodes, result);
            }
        }
    };
    glob(this.json.childNodes, result);

    return result;
};

exports.DOMDocument = DOMDocument;
//cpp.DOMDocument;

