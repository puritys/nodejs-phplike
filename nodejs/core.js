var fs = require("fs");
var path = require('path');
var parentPath = path.dirname(__filename) + '/..';
var nativeModule = parentPath + "/binary/" + process.platform + "_" + process.arch + "/";

if (fs.existsSync(nativeModule) && typeof(UNIT_TEST) == "undefined" ) {
    try {
        var cpp = require(nativeModule +'phplike' );
    } catch (e) {
        console.log("Got Exception. \nThis library could not be loaded, please recompile it.");
    }
} else {

    var cpp = require(parentPath + '/node_modules/bindings')({'bindings': 'phplike', 'module_root': parentPath + '/'});
}

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

exports.mktime = function (hour, minute, second, month, day, year) {
   var d = new Date();
   d.setDate(parseInt(day,10));   
   d.setMonth(parseInt(month,10)-1);   
   d.setFullYear(parseInt(year,10));               
   d.setHours(parseInt(hour,10));        
   d.setMinutes(parseInt(minute,10));        
   d.setSeconds(parseInt(second,10));        
   d.setMilliseconds(0);
   return parseInt(d.getTime()/1000); 
};

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

exports.json_encode = function (text)
{
    return JSON.stringify(text);
}

exports.json_decode = function (text, type)
{
    if (typeof(type) !== "undefined") {
        if (type = "JSON_UNESCAPED_UNICODE") {
            var r = /\\u([\d\w]{4})/gi;
            text = text.replace(r, function (match, grp) {
                return String.fromCharCode(parseInt(grp, 16)); } );

            text = unescape(text);
            return text;
        }
    }
    return JSON.parse(text);
}


exports.usleep = function (useconds)
{
    cpp.usleep(useconds);    
}


exports.sleep = function (seconds)
{
    cpp.usleep(seconds * 1000 * 1000);    
}

exports.system = exports.exec = function (cmd, showMessage)
{
    if (!isset(showMessage)) {
        showMessage = true;
    }
    return cpp.exec(cmd, showMessage);    
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
