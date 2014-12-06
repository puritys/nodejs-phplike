var log = require('npmlog');

var platform = process.platform;
var arch = process.arch;

var name = platform + "_" + arch;

console.log(name);

var proce = require('child_process');

proce.exec('node-gyp configure --release', function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);

    var proce2 = require('child_process');
    proce2.exec('node-gyp build', function (error2, stdout2, stderr2) {
        console.log(stdout2);
        console.log(stderr2);
        var proce3 = require('child_process');
        proce3.exec('mkdir binary/' + name + ' && cp  build/Release/*.node binary/' + name + '/');
    });


});




