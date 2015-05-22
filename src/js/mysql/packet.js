var commandFlags = require('./commandFlags.js');

function isEof (serverInfo, packetReader){//{{{
    var header = packetReader.readInteger(1);
    if (header === 0xFE) {
        packetReader.index--;
        return true;
    } else {
        packetReader.index--;
        return false;
    }
}//}}}

function isColumnDef (serverInfo, packetReader){//{{{
    var header = packetReader.readInteger(1);
    if (header === commandFlags.COM_QUERY) {
        packetReader.index--;
        return true;
    } else {
        packetReader.index--;
        return false;
    }
}//}}}

function readError(serverInfo, packetReader) {//{{{
    var resInfo = {};

    resInfo['errorCode'] = packetReader.readInteger(2);
    
    if (serverInfo['protocol41'] === true) {
        resInfo['sqlStateMarker'] = packetReader.readString(1);
        resInfo['sqlState'] = packetReader.readString(5);
    }
    resInfo['errorMessage'] = packetReader.readString();
    return resInfo;
}//}}}

function readColumnDefinition(serverInfo, packetReader) {//{{{
    var resInfo = {};

    if (serverInfo['protocol41'] === true) {
        resInfo['catalog'] = packetReader.readLengthEncodedString();
        resInfo['schema'] = packetReader.readLengthEncodedString();
        resInfo['table'] = packetReader.readLengthEncodedString();
        resInfo['orgTable'] = packetReader.readLengthEncodedString();
        resInfo['name'] = packetReader.readLengthEncodedString();
        resInfo['orgName'] = packetReader.readLengthEncodedString();
        resInfo['nextLength'] = packetReader.readInteger(1);
        resInfo['characterSet'] = packetReader.readInteger(2);
        resInfo['columnLength'] = packetReader.readInteger(4);
        resInfo['columnType'] = packetReader.readInteger(1);
        resInfo['flags'] = packetReader.readInteger(2);
        resInfo['decimals'] = packetReader.readInteger(1);

    }
    return resInfo;
}//}}}

function readQueryOkPacket(serverInfo, packetReader) {//{{{
    var resInfo = {}, length , okInfo = {};

    okInfo.header = packetReader.readInteger(1);
    okInfo.affectedRows = packetReader.readLengthEncodedInteger();
    okInfo.lastInsertId = packetReader.readLengthEncodedInteger();
    return okInfo;
}//}}}

exports.isEof = isEof;
exports.readError = readError;
exports.readColumnDefinition = readColumnDefinition;
//exports.readResult = readResult;
exports.isColumnDef = isColumnDef;
exports.readQueryOkPacket = readQueryOkPacket;
