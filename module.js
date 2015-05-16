var path = require('path');

//var sprintf = require("sprintf").sprintf;
var fs = require("fs");
var _Directory = require("fs").Directory;
var File = require("fs").File;

var casting = require("./nodejs/casting_type.js");
var str = require("./nodejs/string.js");
var file = require("./nodejs/file.js");
var core = require("./nodejs/core.js");
var curl = require("./nodejs/curl.js");
var array = require("./nodejs/array.js");
var xml = require("./nodejs/DOMDocument.js");
var socket = require("./nodejs/socket.js");
var mysql = require("./nodejs/mysql.js");







for(var method in casting) {
    exports[method] = casting[method];
}

for(var method in str) {
    exports[method] = str[method];
}
for(var method in file) {
    exports[method] = file[method];
}

for(var method in core) {
    exports[method] = core[method];
}


for(var method in curl) {
    exports[method] = curl[method];
}

for(var method in array) {
    exports[method] = array[method];
}

for(var method in xml) {
    exports[method] = xml[method];
}
for(method in socket) {
    exports[method] = socket[method];
}
for(method in mysql) {
    exports[method] = mysql[method];
}

