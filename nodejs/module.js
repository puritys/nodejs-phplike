var cpp = require("./../build/Release/phplike");

//var sprintf = require("sprintf").sprintf;
var fs = require("fs");
var _Directory = require("fs").Directory;
var File = require("fs").File;



for(var method in cpp) {
    exports[method] = cpp[method];
}

