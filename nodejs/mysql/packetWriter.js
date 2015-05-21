
function packetWriter() {
    this.index = 0;
    this.buffers = [];
}

var o = packetWriter.prototype;

function writeInteger (buffer, start, bytes, value) {
    for (var i = 0; i < bytes; i++) {
        buffer[start + i] = (value >> (i * 8)) & 0xff;
    }
}

o.writeString = function (value) {
    if (!value) return "";
    var buffer = new Buffer(value.length);
    buffer.write(value, 0, 'binary');
    this.index += value.length;
    this.buffers.push(buffer);
};

o.writeStringWithNull = function (value) {
    var buffer = new Buffer(value.length + 1);

    buffer.write(value, 0, 'binary');
    buffer[value.length] = 0x00;
    this.index += value.length + 1;
    this.buffers.push(buffer);
};

o.writeBuffer = function (buffer) {
    this.index += buffer.length;
    this.buffers.push(buffer);
};


o.writeInteger = function (bytes, value) {
    var buffer = new Buffer(bytes);
    writeInteger(buffer, 0, bytes, value);
    this.index += bytes;
    this.buffers.push(buffer);
};

o.writeFills = function (bytes) {
    var buffer = new Buffer(bytes);
    for (var i = 0; i < bytes; i++) {
        buffer[i] = 0x00;
    }
    this.index += bytes;
    this.buffers.push(buffer);
}

o.getResult = function (pkNumber) {
    var packetLength, packetNumber = 0, buffer, i, n, tmpBuf, resIndex = 4;
    packetLength = this.index;
    buffer = Buffer(packetLength + 4);
    if (typeof(pkNumber) != "undefined") packetNumber = pkNumber;
    writeInteger(buffer, 0, 3, packetLength); // start from 0
    writeInteger(buffer, 3, 1, packetNumber); // start from 3

    n = this.buffers.length;
    for (i = 0; i< n; i++) {
        tmpBuf = this.buffers[i];
        tmpBuf.copy(buffer, resIndex, 0, tmpBuf.length);
        resIndex += tmpBuf.length;
    }
    return buffer;

};

module.exports = packetWriter;
