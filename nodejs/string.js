var casting = require("./casting_type");

/**
* str_pad 
* @param str string, 
* @param len length, 
* @param chr  string,
* @param dir direction: left or right 
*/
function str_pad(str, len, chr, dir)
{/*{{{*/
    str = str.toString();
    len = (typeof len == 'number') ? len : 0;
    chr = (typeof chr == 'string') ? chr : ' ';
    dir = (/left|right|both/i).test(dir) ? dir : 'right';
    var repeat = function(c, l) {

        var repeat = '';
        while (repeat.length < l) {
            repeat += c;
        }
        return repeat.substr(0, l);
    }
    var diff = len - str.length;
    if (diff > 0) {
        switch (dir) {
            case 'left':
                str = '' + repeat(chr, diff) + str;
                break;
            case 'both':
                var half = repeat(chr, Math.ceil(diff / 2));
                str = (half + str + half).substr(1, len);
                break;
            default:
                str = '' + str + repeat(chr, diff);
        }
    }
    return str;
}/*}}}*/

exports.trim = function (str) {
    return str.replace(/^[\s]+/, '').replace(/[\s]+$/, '');
};



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


exports.str_pad = str_pad;

