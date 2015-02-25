var fs = require("fs");
var DOMNodeMod = require("./xml/DOMNode");

if (nativeModule === undefined) {
    var path = require('path');
    var parentPath = path.dirname(__filename) + '/..';
    var nativeModule = parentPath + "/binary/" + process.platform + "_" + process.arch + "/";
}

if (fs.existsSync(nativeModule) && typeof(UNIT_TEST) == "undefined" ) {
    try {
        var cpp = require(nativeModule +'phplike' );
    } catch (e) {
        console.log("Got Exception. \nThis library could not be loaded, please recompile it.");
    }
} else {
    try {
        var cpp = require(parentPath + '/node_modules/bindings')({'bindings': 'phplike', 'module_root': parentPath + '/'});
    } catch (e) {

    }
}

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
        phpNode = new DOMNodeMod(this.json);
        result.push(phpNode);
        return result;
    }
    var glob = function (childNodes, result) {
        for (var index in childNodes ) {
            node = childNodes[index];
            if (node.name === name) {
                phpNode = new DOMNodeMod(node);
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

