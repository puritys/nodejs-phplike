var casting = require("./casting_type");

exports.ord = function (str) {
    if (!casting.is_string(str)) {
        return "";
    }
    return str.charCodeAt(0);
};

exports.chr = function (ord) {
    if (!casting.is_int(ord)) {
        return "";
    }
    return String.fromCharCode(ord);
}

exports.decbin = function (dec) {
    return dec.toString(2);
}

exports.bindec = function (bin) {
    bin = bin.toString();
    var n = bin.length;
    var retval = 0;
    var powVal = 1;
    for (var i = n - 1 ; i >= 0; i--) {
        retval += parseInt(bin.substr(i, 1), 10) * powVal;
        powVal *= 2;
    }
    return retval;
}
