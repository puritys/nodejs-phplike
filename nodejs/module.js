var cpp = require("./../build/Release/phplike");

//var sprintf = require("sprintf").sprintf;
var fs = require("fs");
var _Directory = require("fs").Directory;
var File = require("fs").File;

var casting = require("./casting_type.js");
var str = require("./string.js");
var file = require("./file.js");
var core = require("./core.js");




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

