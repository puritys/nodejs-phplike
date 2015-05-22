var cpp = require('./requireNative.js');

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






