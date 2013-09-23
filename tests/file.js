require('./../nodejs/index.js');
//require('phplike');
var content = file_get_contents("file.js");
print_r(content);

file_put_contents("tmp", "test");
content = file_get_contents("tmp");
print_r("tmp = " + content);

unlink("tmp");
