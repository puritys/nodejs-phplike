
//var sprintf = require("sprintf").sprintf;
var fs = require("fs");
var _Directory = require("fs").Directory;
var File = require("fs").File;

var casting = require("./casting_type.js");
var str = require("./string.js");
var file = require("./file.js");
var core = require("./core.js");
var curl = require("./curl.js");
var array = require("./array.js");
var xml = require("./DOMDocument.js");




//for(var method in PL) {
//    global[method] = PL[method];
//}

for(var method in casting) {
    global[method] = casting[method];
}
for(var method in str) {
    global[method] = str[method];
}
for(var method in file) {
    global[method] = file[method];
}
for(var method in core) {
    global[method] = core[method];
}
for(var method in curl) {
    global[method] = curl[method];
}
for(var method in array) {
    global[method] = array[method];
}
for(var method in xml) {
    global[method] = xml[method];
}

