var php = require('./../include.js');
var socket = require('./../mock/socket.js');

var assert = require("assert");
var packetReader = require('./../../nodejs/mysql/packetReader.js');

var serverInfo = {
    "session": "0000"
};

function setResponseBuffer(data) {//{{{
    var index = 0, len = data.length, buf = new Buffer(data.length);
    for (i = 0; i < len; i+=2) {
        hex = data.substr(i, 2);
        if (!hex) continue;
        hex = parseInt(hex, 16);
        buf[index++] = hex;
    }
    socket.setRecv(buf);

}//}}}

describe('Mysql: method mysql_connect', function() {//{{{
    it("Normal", function() {
        var buf, tester, res, expect;
        var datas = [
          //expect, res, host, user
            ["a", "0a  616161000  1010101  0a0a0a0a0a0a0a0a", "test.com", ""], 
            ["a", "0a  616161000  1010101  0a0a0a0a0a0a0a0a", "test.com:3306", ""], 
        ];
        datas.forEach(function (data) {
            var host, user, res, buf = new Buffer(200), buf1 = new Buffer(10);
            var len, i, hex, index = 0;
            buf1[index++] = data[1].replace(/[\s]+/, '').length;
            buf1[index++] = 0x00;
            buf1[index++] = 0x00;
            socket.setRecv(buf1);

            index = 0;
            len = data[1].length;
            for (i = 0; i < len; i+=2) {
                hex = data[1].substr(i, 2);
                if (!hex) continue;

                hex = parseInt(hex, 16);
                buf[index++] = hex;
            }

            socket.setRecv(buf);
            host = data[2];
            user = data[3];
            res = php.mysql_connect(host, user);
            //console.log(res);
            assert.equal(10, res.procotolVersion, "procotolVersion fail");
        });
    });

});


describe('Mysql: method mysql_select_db', function() {//{{{
    it("Normal", function() {
        var buf, tester, res, expect;
        var datas = [
          //expect, res, host, user
            ["", "00000000", "dbName"] 
        ];
        datas.forEach(function (data) {
            var host, user, res, d;
            var len, i, hex, index = 0;
            d = data[1].replace(/[\s]+/, '').length;
            d += "0000";
            setResponseBuffer(d);
            setResponseBuffer(data[1]);
            res = php.mysql_select_db(data[2], serverInfo);
        });
    });

});

describe('Mysql: method mysql_query', function() {//{{{
    it("Insert", function() {
        var buf, tester, res, expect;
        var datas = [
          //expect, res sql
            [3, "00010300", "insert into xxx"] 
        ];
        datas.forEach(function (data) {
            var res, d, expect;
            expect = data[0];
            d = data[1].replace(/[\s]+/, '').length;
            d += "0000";
            setResponseBuffer(d);
            setResponseBuffer(data[1]);
            php.mysql_query(data[2], serverInfo);
            res = php.mysql_insert_id(serverInfo);
            assert.equal(expect, res);
        });
    });

});

