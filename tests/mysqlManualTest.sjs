global.MYSQL_DEBUG = 0; // Level 1
global.UNIT_TEST = false;
var php = require('./include.js');
var assert = require("assert");
var host = "127.0.0.1";
var user = "test";
var password = "test";
var dbName = "test";


describe("MySql Prepare data", function () {//{{{

    it("create db and table", function () {
        var mysqlInsertId;
        php.mysql_connect(host, user, password);
        php.mysql_select_db(dbName);
        php.mysql_query('drop table if exists book;');
       // php.mysql_create_db("test");
        var sql = 'create table book ( id int AUTO_INCREMENT, name char(20), sn char(20),  PRIMARY KEY (id))ENGINE=MyISAM;';
        php.mysql_query(sql);
        var datas = [
            ['Better performance', '1234'],
            ['Node.js', '1235'],
            ['中文書', '999'],
            ['DataForUpdate', '0'],


        ];
        for (var i in datas)  {
            php.mysql_query("insert into book(name, sn) values('" +datas[i][0]+"', '" + datas[i][1]+"');");
            mysqlInsertId = php.mysql_insert_id();
            assert.equal(parseInt(i, 10) + 1, mysqlInsertId, "mysqlInsertId should be equal to " + (parseInt(i, 10) + 1));
        }
    });
});//}}}

describe("MySql Query", function () {//{{{
    it("mysql_connect", function () {
        var res;
        php.mysql_connect(host, user, password);
        php.mysql_select_db(dbName);
        res = php.mysql_query("select id from book where id = 1;");
        php.mysql_close();
        //console.log("result ");console.log(res);
        assert.equal(1, res[0]['id']);
        assert.equal(1, res.length, "rows number is 1, actual value is " + res.length);


    });

    it("mysql_connect with server variable", function () {
        var res, sock;
        sock = php.mysql_connect(host + ":3306", user, password);
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

    it("update query", function () {
        var res;
        php.mysqli_connect(host, user, password, dbName, 3306);
        php.mysql_query("update book set sn = 1 where id = 4;");
        res = php.mysql_query("select sn from book where name = 'DataForUpdate'");

        //console.log("result ");console.log(res);
        assert.equal(1, res[0]['sn']);
    });
 
});//}}}

