var php = require('./include.js');

var assert = require("assert");
var host = "127.0.0.1";
var user = "test";
var password = "test";
var dbName = "test";

describe("MySql Query", function () {
    it("mysql_connect", function () {
        var res;
        php.mysql_connect(host, user, password);
        php.mysql_select_db("test");
        res = php.mysql_query("select id from book where id = 1;");
        php.mysql_close();
        //console.log("result ");console.log(res);
        assert.equal(1, res[0]['id']);
    });

    it("mysql_connect with server variable", function () {
        var res, sock;
        sock = php.mysql_connect(host, user, password);
        php.mysql_select_db("test", sock);
        res = php.mysql_query("select id from book where id = 1;", sock);
        php.mysql_close(sock);
        //console.log("result ");console.log(res);
        assert.equal(1, res[0]['id']);
    });




    it("simple query", function () {
        var res;
        php.mysqli_connect(host, user, password, dbName, 3306);
        res = php.mysql_query("select name from book;");

        //console.log("result ");console.log(res);
        assert.equal("Better performance", res[0]['name']);
        assert.equal("Node.js", res[1]['name']);
        assert.equal("中文書", res[2]['name']);

        res = php.mysql_query("select name,sn from book;");

        //console.log("result ");console.log(res);
        assert.equal("Better performance", res[0]['name']);
        assert.equal("Node.js", res[1]['name']);
        assert.equal("1234", res[0]['sn']);

    });

});

