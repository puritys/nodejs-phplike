var socket = require('./socket.js');
//var hexdump = require('hexdump-nodejs');

function mysqli_connect(host, user, password, dbName, port) {
    var serverInfo = [];
    var sockfd = socket.fsockopen(host, port);
//    var res = socket.fread(sockfd, 10);
//    var reader = new packetReader(res);
//    reader.passBytes(4);
//    serverInfo['procotolVersion'] = reader.readInteger(1);
//console.log(serverInfo);
//    var b = new Buffer(res);
//    console.log(b);
//
    return res;
}


function mysql_query_man() {

}

/** parser **/
function packetReader(data) {
    this.data = data;
    this.index = 0;
}
var o = packetReader.prototype;

o.readInteger = function (bytes) {
    var res = this.data.substr(this.index, bytes);
    res = parseInt(res, 10);
    this.index += bytes;
    return res;
};

o.passBytes = function (bytes) {
    this.index += bytes;
}

/*******/

exports.mysqli_connect = mysqli_connect;


