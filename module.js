var cpp = require("./build/Release/phplike");

//var sprintf = require("sprintf").sprintf;
var fs = require("fs");
var _Directory = require("fs").Directory;
var File = require("fs").File;

var casting = require("./nodejs/casting_type.js");
var str = require("./nodejs/string.js");
var file = require("./nodejs/file.js");
var core = require("./nodejs/core.js");
var curl = require("./nodejs/curl.js");




for(var method in cpp) {
    exports[method] = cpp[method];
}

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

