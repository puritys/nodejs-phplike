var php = require('./include.js');

test1();

function test1() {
    var socket = php.fsockopen("localhost", 3307);
    php.sendcmd("test", socket);
    var response = php.fread(socket, 9999);
    console.log("response = " + response);
    php.fclose(socket);
}
