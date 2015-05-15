var fs = require("fs");

if (nativeModule === undefined) {
    var path = require('path');
    var parentPath = path.dirname(__filename) + '/..';
    var nativeModule = parentPath + "/binary/" + process.platform + "_" + process.arch + "/";
}

if (fs.existsSync(nativeModule) && typeof(UNIT_TEST) == "undefined" ) {
    try {
        var cpp = require(nativeModule +'phplike' );
    } catch (e) {
        console.log("Got Exception. \nThis library could not be loaded, please recompile it.");
    }
} else {
    try {
        var cpp = require(parentPath + '/node_modules/bindings')({'bindings': 'phplike', 'module_root': parentPath + '/'});
    } catch (e) {

    }
}

function fsockopen(hostname, port) {
    return cpp.nodeSocketConnet(hostname, port);
}

function sendcmd(msg, socket) {
    cpp.nodeSocketSend(socket, msg);
}

function fwrite(socket, msg) {
    cpp.nodeSocketSend(socket, msg);
}
function fread(socket, length) {
    return cpp.nodeSocketReceive(socket);
}



exports.fsockopen = fsockopen;
exports.sendcmd = sendcmd;
exports.fwrite = fwrite;
exports.fread = fread;






