require('./../src/js/index.js');
//require('phplike');

var t = time();
console.log(t);

console.log("sleep a second.");
sleep(1);
console.log("sleep done");

var d = date("Y年M月D日");
print_r(d);

var o = {"name": "puritys", "age": "99"};
print_r(o);

o = function aa(){
    var aa = "ccc";
}
var s = new o();
print_r(s);



var str = "php is a good language";
var enStr = base64_encode(str);
print_r(enStr);
str = base64_decode(enStr);
print_r(str);
