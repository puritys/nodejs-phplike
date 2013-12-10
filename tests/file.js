require('./../nodejs/index.js');
//require('phplike');

var d = readdir("/home/puritys");
print_r(d[1]);

if (is_file("file.js")) {
    print_r("is file");
}

if (is_dir("../tests")) {
    print_r("is dir");
}
var content = file_get_contents("file.js");
print_r("File content = " + substr(content, 0, 30));

file_put_contents("tmp", "test");
content = file_get_contents("tmp");
print_r("tmp = " + content);

unlink("tmp");

mkdir("test55/b/c");
file_put_contents("test55/b/c/aa", "string");
var isForce = true;
rmdir("test55", isForce);
