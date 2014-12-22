var fs = require("fs");
function is_file(filename) {/*{{{*/
    if(fs.existsSync(filename)){
        return true;
    }
    return false;
}/*}}}*/

function is_dir(filename) {/*{{{*/
    if(!is_file(filename)) {
        return false;
    }
    var stat = fs.statSync(filename);
    if (stat.isDirectory()) {
        return true;
    }

    return false;
};/*}}}*/

function readdir(dir) {//{{{
    if (is_dir(dir)) {
        return fs.readdirSync(dir);
    } else {
        return ;
    }

};//}}}

/*
 * isForce force to remove dir even this dir is not empty
 */
function rmdir(dir, isForce) {//{{{
    if (is_dir(dir)) {
        if (isForce) {
            var fileList = readdir(dir);
            var n = fileList.length;
            for (var i = 0; i < n ;i++) {
                if (is_dir(dir + "/" + fileList[i])) {
                    rmdir(dir + "/" + fileList[i], isForce);
                } else {
                    unlink(dir + "/" +fileList[i]);
                }
            }
        }
        return fs.rmdirSync(dir);
    } 
};//}}}

function unlink(filename) {
    return fs.unlinkSync(filename);
}


/*
 * @param filename
 */
exports.readfile = exports.file_get_contents = function(filename, type) {/*{{{*/
    var _File = require("fs").File;
//    f= new _File(filename);
    if (!fs.existsSync(filename)) {
        return "";
    }

    if (type && type == "binary") {
        return fs.readFileSync(filename , "binary");
    }

    return fs.readFileSync(filename , "UTF-8");

}/*}}}*/

/* file_contents_put
 * @param filename
 */
exports.file_put_contents = function(filename, data) {/*{{{*/
    var encoding = "";
    if (arguments[2]) {
        encoding = arguments[2]; // binary
    }
    fs.writeFileSync(filename, data, encoding);
    return true;
}/*}}}*/

/* mkdir
 * @param filename
 */
exports.mkdir = function(dirName) {/*{{{*/
    var s = dirName.split(/\//);
    var n =s.length;
    var dir = "";
    var i = 0;
    if (!s[0]) {
        i = 1;
        dir = "/";
    }
    for (i; i < n; i++) {
        dir += s[i] + "/";
        if(fs.existsSync(dir)){
            continue;
        }
        try{
            fs.mkdirSync(dir);
        } catch(e) {
            console.log(e);
            throw e
        }
    }
};/*}}}*/




exports.substr = function (str, start, length) {
    return str.substr(start, length);
};

exports.readdir = readdir;
exports.is_dir = is_dir;
exports.is_file = is_file;
exports.rmdir = rmdir;
exports.unlink = unlink;
