var PL = require("./node_modules/phplike");
var sprintf = require("sprintf").sprintf;
var fs = require("fs");
var _Directory = require("fs").Directory;
var File = require("fs").File;
require("./casting_type.js");

global.sprintf = require("sprintf").sprintf;

/**
* str_pad string, length, replace string, left or right 
*/
global.str_pad = function (str, len, chr, dir)
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

global.time = function (add)
{/*{{{*/
    var d = new Date();
    var t = d.getTime();
    if (add) {
        t += add;
    }
    t = Math.round(t/1000);
    return t;
}/*}}}*/


global.date = function (format)
{/*{{{*/
    var d = new Date();
    if (arguments[1]) {
        d.setTime(arguments[1]*1000);
    }
    //Y
    var re = /Y/;
    format = format.replace(re, d.getFullYear());
    var re = /m/;
    format = format.replace(re, str_pad(d.getMonth()+1, 2, '0', 'left'));
    var re = /d/;
    format = format.replace(re, str_pad(d.getDate(), 2, '0','left'));
    var re = /H/;
    format = format.replace(re, str_pad(d.getHours(), 2, '0','left'));
    var re = /i/;
    format = format.replace(re, str_pad(d.getMinutes(), 2, '0','left'));
    var re = /s/;
    format = format.replace(re, str_pad(d.getSeconds(), 2, '0','left'));

    return format;
}/*}}}*/

/*
 * @param obj
 * @param prefix space 
 */ 
global.print_r = function(obj) 
{/*{{{*/
    console.log(obj);
}/*}}}*/

global.base64_encode = function (text)
{
    return new Buffer(text, 'binary').toString('base64');
}
global.base64_decode = function (text)
{
    return new Buffer(text, 'base64').toString();
}


global.sleep = function (seconds)
{
    PL.usleep(seconds*1000);    
}



