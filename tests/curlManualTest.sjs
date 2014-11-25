var phplikeMod = require('./include.js');

test2();

function test1() {
    var url = "http://localhost:8080/";
    var param = {"q": "x"};
    var header = {"Cookie": "xxx"};
    var res = phplikeMod.request("GET", url, param, header);
}


function test2() {
    var url = "http://localhost:8080/";
    var param = {"q": "x"};
    var header = {"Cookie": "xxx"};
    var c = phplikeMod.curl_init();
    phplikeMod.curl_setopt(c, 'CURLOPT_URL', url);
    phplikeMod.curl_setopt(c, 'CURLOPT_POST', 1);
    phplikeMod.curl_setopt(c, 'CURLOPT_POSTFIELDS', "a=bbb&c=eee");
    phplikeMod.curl_setopt(c, 'CURLOPT_HTTPHEADER', header);



    var res = phplikeMod.curl_exec(c);


}



//console.log(res);
