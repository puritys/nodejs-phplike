/** parser **/
function packetReader(data) {
    this.length = data.length;
    this.data = new Buffer(data, 'binary');
    this.index = 0;
}
var o = packetReader.prototype;

// https://dev.mysql.com/doc/internals/en/integer.html#packet-Protocol::LengthEncodedInteger
o.readLengthEncodedInteger = function () {//{{{
    var value = 0;
    value = this.data[this.index++];
    if (value < 251) {

    } else if (value === 251) {
        return null;
    } else if (value === 252) {
        value = this.readInteger(2);
    } else if (value === 253) {
        value = this.readInteger(3);
    } else if (value === 254) {
        value = this.readInteger(8);
    } else if (value === 255) {
        // It is a ERR_Packet
        console.log("It is a error packet [0xFF]");
        return null;
    }
    return value;
};//}}}

o.readLengthEncodedString = function () {//{{{
    var str = "", len;
    len = this.readLengthEncodedInteger();
    str = this.readString(len);
    return str;
    return value;

};//}}}

o.readInteger = function (bytes) {//{{{
    var res = 0;
    for (var i = bytes - 1; i >= 0; i--) {
        res = ((res << 8) | this.data[this.index + i]) >>> 0;
    }
    this.index += bytes;
    return res;
};//}}}

o.readString = function (bytes) {//{{{
    var res = "", b = 1;
    if (typeof(bytes) === "undefined" || !bytes) {
        while (b !== 0) {
            if (this.index === this.length) return res;
            b = this.data.readUInt8(this.index++);
            if (b === 0) return res;
            res += String.fromCharCode(b);
        }
    } else {
        while (bytes > 0) {
            b = this.data.readUInt8(this.index++);
            res += String.fromCharCode(b);
            bytes--;
        }

    }
    return res;
};//}}}

/**
 * Packet Format: [length] [string] [length] [string]
 */
o.readFieldsValue = function () {
    var res = [], buf, strStart = 0, strEnd = 0, strLength = 0;
    while (1) {
        strLength = this.readLengthEncodedInteger();
        strStart = this.index;
        strEnd = strStart + strLength;
        if (strEnd > this.length) return res;

        buf = new Buffer(strLength);
        this.data.copy(buf, 0, strStart, strEnd);
        res.push(buf.toString('UTF8', 0, strLength));
        this.index += strLength;

        if (this.length === strEnd) {
            break;
        }
    } 
    return res;
};


o.passBytes = function (bytes) {
    this.index += bytes;
};

o.isTheEnd = function () {
    return (this.length <= this.index);
};

module.exports = packetReader;
