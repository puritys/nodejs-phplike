/**
 * document Node
 *
 * nodeType:
    1 element
    2 attribute
    3 text
 */
function DOMNode(node) {
    this.nodeName = node.name;
    this.nodeValue = node.value;
    if (node.attributes) {
        this.attributes = node.attributes;
    }

    if (node.childNodes
        && node.childNodes.length > 0
       ) {
        
        this.firstChild = new DOMNode(node.childNodes[0]);
        if (node.childNodes.length === 1) {
            this.lastChild = new DOMNode(this.firstChild);
        } else {
            this.lastChild = new DOMNode(node.childNodes[node.childNodes.length - 1]);
        }

    }
}

var o = DOMNode.prototype;

o.nodeName = "";
o.nodeValue = 1;
o.firstChild = "";
o.lastChild = "";
o.attributes = {};

o.hasAttributes = function () {
    if (this.attributes) {
        for (var name in this.attributes) {
            return true;
        }
    }
    return false;
};





module.exports = DOMNode;
