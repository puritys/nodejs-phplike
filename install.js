var fs = require("fs");
var path = require('path');
var parentPath = path.dirname(__filename);
var nativeModule = parentPath + "/binary/" + process.platform + "_" + process.arch + "/";

var isNative = false;
if (fs.existsSync(nativeModule) && !fs.existsSync("Makefile")) {
    try {
        var PL = require(nativeModule +'phplike' );
        var res = PL.exec("echo a");
        if (res.match(/^a/)) {
            isNative = true;
        }
    } catch (e) {
        //console.log(e);
        console.log("Binary code could not be loaded.");
    }
}

if (isNative == false) {
    var fileHandle = require('./nodejs/file.js');
    var isForce = true;
    fileHandle.rmdir('./binary', isForce);
    console.log("Auto Recompile C/C++ library.");
    var proce = require('child_process');

    var res  = proce.exec('node-gyp rebuild', function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });

}
