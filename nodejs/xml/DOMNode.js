
function DOMNode(node) {
    this.nodeName = node.name;
    this.nodeValue = node.value;
    this.nodeType = 0; 
}

var o = DOMNode.prototype;

o.nodeName = "";

module.exports = DOMNode;
