var php = require('./../include.js');
var socket = require('./../mock/socket.js');

var assert = require("assert");
var packetReader = require('./../../src/js/mysql/packetReader.js');

var serverInfo = {
    "session": "0000",
    "protocol41": true
};

function setResponseBuffer(data) {//{{{
    var index = 0, len = data.length, buf = new Buffer(data.length/2);
    for (i = 0; i < len; i+=2) {
        hex = data.substr(i, 2);
        if (!hex) continue;
        hex = parseInt(hex, 16);
        buf[index++] = hex;
    }
    //console.log(buf);
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

    it("Update", function() {
        var buf, tester, res, expect;
        var datas = [
          //expect, res sql
            [3, "00010300", "update"] 
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

    it("Exception", function() {
        var buf, tester, res, expect;
        var datas = [
          //expect, res sql
            [3, "ff05000000000000  61616100", "select"] 
        ];
        datas.forEach(function (data) {
            var res, d, expect;
            expect = data[0];
            d = data[1].replace(/[\s]+/, '').length;
            d += "0000";
            setResponseBuffer(d);
            setResponseBuffer(data[1]);
            try {
                php.mysql_query(data[2], serverInfo);
            } catch (e) {
                assert.equal("Error[5]:aaa", e.message);
            }
        });
    });

    it("Select", function() {
        var buf, tester, res, expect;
        var datas = [
          //expect, res sql
            ["a", "00010300", "03 64 65 66 04 74 65 73 74 04 62 6F 6F 6B 04 62 6F 6F 6B 04 6E 61 6D 65 04 6E 61 6D 65 0C 21 00 3C 00 00 00 FE 00 00 00 00 00", "FE 00 00 22 00", "01 61", "FE 00 00 22 00", "select name from book"] 
        ];
        datas.forEach(function (data) {
            var res, d, expect;
            expect = data[0];
            d = data[1].replace(/[\s]+/g, '').length.toString(16);
            d += "000000";
            setResponseBuffer(d);
            setResponseBuffer(data[1].replace(/[\s]+/g, ''));

            d = data[2].replace(/[\s]+/g, '').length.toString(16);
            d += "000000";
            setResponseBuffer(d);
            setResponseBuffer(data[2].replace(/[\s]+/g, ''));

            //column end
            d = data[3].replace(/[\s]+/g, '').length.toString(16);
            d += "000000";
            setResponseBuffer(d);
            setResponseBuffer(data[3].replace(/[\s]+/g, ''));

            d = data[4].replace(/[\s]+/g, '').length.toString(16, 2);
            if (d.length == 1) d = "0" + d;
            d += "000000";
            setResponseBuffer(d);
            setResponseBuffer(data[4].replace(/[\s]+/g, ''));

            //end
            d = data[5].replace(/[\s]+/g, '').length.toString(16, 2);
            if (d.length == 1) d = "0" + d;
            d += "000000";
            setResponseBuffer(d);
            setResponseBuffer(data[5].replace(/[\s]+/g, ''));

            res = php.mysql_query(data[6], serverInfo);
            assert.equal(expect, res[0]['name']);
        });
    });


});

