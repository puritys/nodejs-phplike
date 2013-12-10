var fs = require("fs");

/*
 * @param filename
 */
global.file_get_contents = function(filename) {/*{{{*/
    var _File = require("fs").File;
//    f= new _File(filename);
    if (!fs.existsSync(filename)) {
        return "";
    }
//    return fs.readFileSync(filename , "UTF-8");
    return fs.readFileSync(filename , "binary");

}/*}}}*/

/* file_contents_put
 * @param filename
 */
global.file_put_contents = function(filename, data) {/*{{{*/
    var encoding = "";
    if (arguments[2]) {
        encoding = arguments[2]; // binary
    }
    fs.writeFileSync(filename, data, encoding);
    return true;
}/*}}}*/


global.unlink = function (filename) {
    return fs.unlinkSync(filename);
}

global.is_file = function(filename) {/*{{{*/
    if(fs.existsSync(filename)){
        return true;
    }
    return false;
}/*}}}*/

global.is_dir = function(filename) {/*{{{*/
    if(!is_file(filename)) {
        return false;
    }
    var stat = fs.statSync(filename);
    if (stat.isDirectory()) {
        return true;
    }

    return false;
};/*}}}*/

global.readdir = function (dir) {
    if (is_dir(dir)) {
        return fs.readdirSync(dir);
    } else {
        return ;
    }

};

global.substr = function (str, start, length) {
    return str.substr(start, length);
};

