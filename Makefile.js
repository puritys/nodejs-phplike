var log = require('npmlog');

var platform = process.platform;
var arch = process.arch;

var name = platform + "_" + arch;

console.log(name);

var proce = require('child_process');

var res  = proce.exec('node-gyp configure', function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
});


var res  = proce.exec('node-gyp build', function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
});


proce.exec('cp -r build/Release/ binary/' + name + '');


