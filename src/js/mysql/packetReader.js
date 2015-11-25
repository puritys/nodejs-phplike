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
    var res = "", b = 1, buf, strEnd = 0, index, strLength = 0;
    if (typeof(bytes) === "undefined" || !bytes) {
        index = this.index;
        while (b !== 0) {
            if (index === this.length) {
                break;
            }
            b = this.data.readUInt8(index);
            if (b === 0) break;
            strLength++; index++;
        }
        res = this.data.toString('UTF8', this.index, this.index + strLength);
        this.index += strLength + 1;
        return res;
    } else {
        var strEnd;
        if (this.length < this.index + bytes) {
            strEnd = this.length;
            bytes = this.length - this.index;
        } else {
            strEnd = this.index + bytes;
        }
        res = this.data.toString('UTF8', this.index, strEnd);
        this.index += bytes; 
        return res;
    }
};//}}}

/**
 * Packet Format: [length] [string] [length] [string]
 */
o.readFieldsValue = function () {
    var res = [], buf, strStart = 0, strEnd = 0, strLength = 0;
    while (1) {
        strLength = this.readLengthEncodedInteger();
        if (!strLength) return res;
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
