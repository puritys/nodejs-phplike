//var phplike = require ('./../nodejs/phplike');
var phplike = require ('./../build/Release/phplike');

var str = "";
for (var i =0; i < 20; i++) {
    str += "1";
    if (i%1000 == 0) {
        str += "\n";
    }
}
console.log("start to run exec");

var res = phplike.exec("echo '" + str + "'");

console.log(res);

res = phplike.exec("ls / | wc -l ");

console.log("Counting dir = " + res);

