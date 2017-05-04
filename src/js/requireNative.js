var fs = require("fs");
var cpp;
if (nativeModule === undefined) {
    var path = require('path');
    var parentPath = path.dirname(__filename) + '/../..';
    var nativeModule = parentPath + "/binary/" + process.platform + "_" + process.arch + "/";
}

if (fs.existsSync(nativeModule) && typeof(UNIT_TEST) == "undefined" ) {
    try {
        cpp = require(nativeModule +'phplike' );
    } catch (e) {
        console.log("Got Exception. \nThis library could not be loaded, please recompile it.");
    }
} else {
    try {
        //cpp = require(parentPath + '/node_modules/bindings')({'bindings': 'phplike', 'module_root': parentPath + '/'});
        cpp = require('bindings')('phplike.node');
    } catch (e) {
        console.error("Can not load phplike from bindings.");
    }
}

module.exports = cpp;
