var socket = require('./socket.js');
var packetReader = require('./mysql/packetReader.js');
var packetWriter = require('./mysql/packetWriter.js');
var packet = require('./mysql/packet.js');


var clientFlags = require('./mysql/clientFlags.js');
var Crypto = require('crypto');
var hexdump = require('hexdump-nodejs');

var serverInfo;

function sha1(msg) {
  var hash = Crypto.createHash('sha1');
  hash.update(msg, 'binary');
  return hash.digest('binary');
}
function xor(a, b) {
    a = new Buffer(a, 'binary');
    b = new Buffer(b, 'binary');
    var result = new Buffer(a.length);
    for (var i = 0; i < a.length; i++) {
      result[i] = (a[i] ^ b[i]);
    }
    return result;
};

function auth(password, key) {
    if (!password) {
        return new Buffer(0);
    }

  // password must be in binary format, not utf8
    var stage1 = sha1((new Buffer(password, "utf8")).toString("binary"));
    var stage2 = sha1(stage1);
    var stage3 = sha1(key.toString('binary') + stage2);
    return xor(stage3, stage1);
};

function readMsg(session) {
    var res = socket.fread(session, 4);
    var reader = new packetReader(res);
    var resLength = reader.readInteger(3);
    res = socket.fread(session, resLength, true);
    return res;
}

function mysql_login(serverInfo, user, password, dbName) {//{{{
    var flags, buffer, maxPacketSize = 1, characterSet, scrambleBuff = "vseeeefgesgtset", authData, authKey;
    characterSet = 33;
    flags = 455631;//clientFlags.CLIENT_PLUGIN_AUTH;

    if (serverInfo['protocol41'] === true) {

        writer = new packetWriter();
        writer.writeInteger(4, flags);
        writer.writeInteger(4, 0x01 << 24);//maxPacketSize);
        writer.writeInteger(1, characterSet);
        writer.writeFills(23);
        writer.writeStringWithNull(user);

        //https://dev.mysql.com/doc/internals/en/secure-password-authentication.html#packet-Authentication::Native41
        //SHA1( password ) XOR SHA1( "20-bytes random data from server" <concat> SHA1( SHA1( password ) ) ) 

        authKey =  new Buffer(serverInfo['authPluginDataPart1'].length + serverInfo['authPluginDataPart2'].length);

        authKey.write(serverInfo['authPluginDataPart1'], 0 ,'binary');
        authKey.write(serverInfo['authPluginDataPart2'], serverInfo['authPluginDataPart1'].length, 'binary');

        authData = auth(password, authKey);
        var length = authData.length;
        writer.writeInteger(1, length); //if length < 251
        writer.writeBuffer(authData);
        writer.writeStringWithNull(dbName);
    } else {
        writer = new packetWriter();
        writer.writeInteger(2, flags);
        writer.writeInteger(3, maxPacketSize);

    }
    var result = writer.getResult();
    console.log(hexdump(result));

    socket.sendcmd(result, serverInfo['session']);
}//}}}

function mysqli_connect(host, user, password, dbName, port) {
    var isBinary = true;
    serverInfo = [];
    var session = socket.fsockopen(host, port);
    var res = socket.fread(session, 4);
    var reader = new packetReader(res);
    var resLength = reader.readInteger(3);

    res = socket.fread(session, resLength, isBinary);
    reader = new packetReader(res);
    serverInfo['session'] = session;
    serverInfo['procotolVersion'] = reader.readInteger(1);
    serverInfo['version'] = reader.readString();
    serverInfo['connectId'] = reader.readInteger(4);
    serverInfo['authPluginDataPart1'] = reader.readString(8);
    reader.passBytes(1);
    serverInfo['capabilityFlag1'] = reader.readInteger(2);
    serverInfo['characterSet'] = reader.readInteger(1);
    serverInfo['statusFlag'] = reader.readInteger(2);
    serverInfo['protocol41'] = (serverInfo['capabilityFlag1'] & (1 << 9)) > 0

    if (serverInfo['protocol41']) {
        serverInfo['capabilityFlag2'] = reader.readInteger(2);
        serverInfo['scrambleLength']  = reader.readInteger(1);
        reader.passBytes(10);
        serverInfo['authPluginDataPart2']  = reader.readString(12);
        reader.passBytes(1);
    } else {
        reader.passBytes(13);
    }

    //console.log(serverInfo);var b = new Buffer(res, 'binary');console.log(hexdump(b));return res;
    if (user) {
        var resInfo = {};
        mysql_login(serverInfo, user, password, dbName);

        res = readMsg(serverInfo['session']);
        reader = new packetReader(res);
        resInfo['header'] = reader.readInteger(1);

        var b = new Buffer(res, 'binary');console.log(hexdump(b));
        if (resInfo['header'] === 0 ) {
            //Successfully login 
            resInfo['affectedRows'] = reader.readLengthEncodedInteger();
            resInfo['lastInsertId'] = reader.readLengthEncodedInteger();
            resInfo['statusFlag'] = reader.readInteger(2);
        } else if (resInfo['header'] === 0xFF) {
            // Error
            resInfo = packet.readError(serverInfo, reader);            
            //console.log(resInfo);
            var err = new Error("Error[" +resInfo['errorCode']+"]:" + resInfo['errorMessage']);
            throw err;
        }


 
    }

    return res;
}

// https://dev.mysql.com/doc/internals/en/com-query.html
function mysql_query(sql) {
    var result, writer, resInfo = [], res;
    writer = new packetWriter();
    writer.writeInteger(1, 3);
    writer.writeString(sql);
    result = writer.getResult(0);
        
    var b = new Buffer(result, 'binary');console.log(hexdump(b));

    socket.sendcmd(result, serverInfo['session']);


    res = readMsg(serverInfo['session']);
    reader = new packetReader(res);
    resInfo['header'] = reader.readInteger(1);

     var b = new Buffer(res, 'binary');console.log(hexdump(b));
    if (resInfo['header'] === 0xFF) {
        // Error
        resInfo = packet.readError(serverInfo, reader);            
        //console.log(resInfo);
        var err = new Error("Error[" +resInfo['errorCode']+"]:" + resInfo['errorMessage']);
        throw err;
    }
    return res;
}

/*******/

exports.mysqli_connect = mysqli_connect;
exports.mysql_query = mysql_query;



