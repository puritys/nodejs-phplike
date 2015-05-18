

function readError(serverInfo, packetReader) {
    var resInfo = {};

    resInfo['errorCode'] = packetReader.readInteger(2);
    
    if (serverInfo['protocol41'] === true) {
        resInfo['sqlStateMarker'] = packetReader.readString(1);
        resInfo['sqlState'] = packetReader.readString(5);
    }
    resInfo['errorMessage'] = packetReader.readString();
    return resInfo;
}

exports.readError = readError;
