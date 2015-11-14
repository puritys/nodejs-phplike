var cmd = "";
if (!global['mockSocket']) {
    global.mockSocket = [];
}

if (!global['mockSocketRecv']) {
    global.mockSocketRecv = [];
    global.mockSocketRecvIndex = 0;
    global.mockSocketRecvEnd = 0;


}


function recv2() {
    return mockSocketRecv[mockSocketRecvIndex++];
    if (mockSocketRecvIndex > 100) mockSocketRecvIndex = 0;

    return "recv";
}

exports.setRecv = function (msg) {
    mockSocketRecv[mockSocketRecvEnd++] = msg;
    if (mockSocketRecvEnd > 100) mockSocketRecvEnd = 0;
};

exports.setFsockopen = function (data) {
    mockSocket.push(data);
};

exports.fsockopen = function () {
    if (mockSocket && mockSocket[0]) return socket.pop();
    return "";
};

exports.sendcmd = function (msg) {
    cmd = msg;
    return msg;
};

exports.recv = function () {
    return recv2();
};

exports.fread = function () {
    return recv2();
};

exports.getcmd = function () {
    return cmd;
};



