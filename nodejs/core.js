var PL = require("./../build/Release/phplike");
//var sprintf = require("sprintf").sprintf;
var fs = require("fs");
var _Directory = require("fs").Directory;
var File = require("fs").File;
var str = require("./string.js");
var casting = require("./casting_type.js");
var phplikeArray = require("./array.js");

//exports.sprintf = require("sprintf").sprintf;

function isset()
{//{{{
  var a = arguments,
    l = a.length,
    i = 0,
    undef;

  if (l === 0)
  {
    throw new Error('Empty isset');
  }

  while (i !== l)
  {
    if (a[i] === undef || a[i] === null)
    {
      return false;
    }
    i++;
  }
  return true;
}//}}}


exports.time = function (add)
{/*{{{*/
    var d = new Date();
    var t = d.getTime();
    if (add) {
        t += add;
    }
    t = Math.round(t/1000);
    return t;
}/*}}}*/


exports.date = function (format)
{/*{{{*/
    var d = new Date();
    if (arguments[1]) {
        d.setTime(arguments[1]*1000);
    }
    //Y
    var re = /Y/;
    format = format.replace(re, d.getFullYear());
    var re = /m/;
    format = format.replace(re, str.str_pad(d.getMonth()+1, 2, '0', 'left'));
    var re = /d/;
    format = format.replace(re, str.str_pad(d.getDate(), 2, '0','left'));
    var re = /H/;
    format = format.replace(re, str.str_pad(d.getHours(), 2, '0','left'));
    var re = /i/;
    format = format.replace(re, str.str_pad(d.getMinutes(), 2, '0','left'));
    var re = /s/;
    format = format.replace(re, str.str_pad(d.getSeconds(), 2, '0','left'));

    return format;
}/*}}}*/

// Get current working directory (path).
exports.getcwd = function () {//{{{
    return process.cwd();
}//}}}

/*
 * @param obj
 * @param prefix space 
 */ 
exports.print_r = function(obj) 
{/*{{{*/
    console.log(obj);
}/*}}}*/

exports.base64_encode = function (text)
{
    return new Buffer(text, 'binary').toString('base64');
}
exports.base64_decode = function (text)
{
    return new Buffer(text, 'base64').toString();
}

exports.urlencode = function (text)
{
    return encodeURIComponent(text);
}
exports.urldecode = function (text)
{
    return decodeURIComponent(text);
}
exports.usleep = function (useconds)
{
    PL.usleep(useconds);    
}


exports.sleep = function (seconds)
{
    PL.usleep(seconds * 1000 * 1000);    
}

exports.system = exports.exec = function (cmd, showMessage)
{
    if (!isset(showMessage)) {
        showMessage = true;
    }
    return PL.exec(cmd, showMessage);    
}

exports.exit = function(code) 
{/*{{{*/
    process.exit(code);
}/*}}}*/


exports.empty = function (v)
{//{{{
    if (!v) {
        return true;
    }
    return false;
 
}//}}}

exports.parse_str = function (paramStr) {
    var i, n;
    var param = {}, paramSplit, pos;
    paramSplit = paramStr.split(/&/);
    n = paramSplit.length;
    for (i = 0; i < n; i++) {
        pos = paramSplit[i].indexOf('=');
        param[paramSplit[i].substring(0, pos)] = paramSplit[i].substring(pos + 1); 
    }
    return param;
};

exports.clone = function (obj) {
    var res;
    if (casting.is_array(obj)) {
        res = phplikeArray.array_merge(obj, []);
    } else if (casting.is_object(obj)) {
        res = phplikeArray.array_merge(obj, {});
    } 
    return res;
};

exports.isset = isset;
