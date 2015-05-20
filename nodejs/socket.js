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

function sendcmd(msg, socket, length) {
    var buff;
    if (typeof(length) === "undefined" || !length) {
        length = msg.length;
    }

    if (typeof(msg) === "string") {
        buff = new Buffer(length);
        buff.write(msg, 0, length, 'binary');
        cpp.nodeSocketSend(socket, buff, length);
    } else {
        cpp.nodeSocketSend(socket, msg, length);
    }
}

function fwrite(socket, msg) {
    cpp.nodeSocketSend(socket, msg);
}
function fread(socket, length, isBinary) {
    if (typeof(length) === "undefined") length = 0;
    if (typeof(isBinary) === "undefined") isBinary = false;

    length = parseInt(length, 10);
    if (length <= 0) return "";
    return cpp.nodeSocketReceive(socket, length, isBinary);
}



exports.fsockopen = fsockopen;
exports.sendcmd = sendcmd;
exports.fwrite = fwrite;
exports.fread = fread;






