var php = require('./include.js');

var assert = require("assert");
var host = "127.0.0.1";
var user = "test";
var password = "test";
var dbName = "test";

describe("MySql Query", function () {
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

