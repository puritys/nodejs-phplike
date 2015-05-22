/**
 * document Node
 *
 * nodeType:
    1 element
    2 attribute
    3 text
 */
function DOMElement(node) {
    this.nodeName = node.name;
    this.nodeValue = node.value;
    if (node.attributes) {
        this.attributes = node.attributes;
    }

    if (node.childNodes
        && node.childNodes.length > 0
       ) {
        
        this.firstChild = new DOMElement(node.childNodes[0]);
        if (node.childNodes.length === 1) {
            this.lastChild = new DOMElement(this.firstChild);
        } else {
            this.lastChild = new DOMElement(node.childNodes[node.childNodes.length - 1]);
        }
        this.childNodes = node.childNodes;
    }


}

var o = DOMElement.prototype;

o.nodeName = "";
o.nodeValue = 1;
o.firstChild = "";
o.lastChild = "";
o.attributes = {};

o.getAttribute = function (name) {
    if (this.attributes[name]) {
        return this.attributes[name];
    }
    return "";
};


o.hasAttributes = function () {
    if (this.attributes) {
        for (var name in this.attributes) {
            return true;
        }
    }
    return false;
};


o.hasAttribute = function (name) {
    if (this.attributes[name]) {
        return true;
    }
    return false;
};


module.exports = DOMElement;
