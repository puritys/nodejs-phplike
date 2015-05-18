var php = require('./include.js');

var assert = require("assert");
var host = "127.0.0.1";
var user = "test";
var password = "test";
var dbName = "test";

describe("db connect", function () {
    it("connect", function () {
        php.mysqli_connect(host, user, password, dbName, 3306);
        php.mysql_query("select name from book;");

    });

});

