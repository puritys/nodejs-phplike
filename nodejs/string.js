
global.ord = function (str) {
    return str.charCodeAt(0);
}

global.chr = function (ord) {
    return String.fromCharCode(ord);
}

global.decbin = function (dec) {
    return dec.toString(2);
}

global.bindec = function (bin) {
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
