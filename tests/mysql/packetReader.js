var phplikeMod = require('./../include.js');

var assert = require("assert");
var packetReader = require('./../../nodejs/mysql/packetReader.js');

//mocha lib/ --grep Packet
describe('Packet Reader: method readString', function() {/*{{{*/

    it('Read fixed string', function() {
        var test = new packetReader("abcd");
        var str = test.readString(2);
        assert.equal("ab", str);

        str = test.readString(2);
        assert.equal("cd", str);


    });

    it('Read string without specific length', function() {
        var data = new Buffer(5);
        data.write("abcd", 0);
        data[4] = 0x00;
        data.write("1234", 5);
        var test = new packetReader(data);
        var str = test.readString();
        assert.equal("abcd", str);
    });

    it('Read out of bound', function() {
        var test = new packetReader("abcd"), str;
        try {
            str = test.readString(5);
            assert.equal(true, false, 'bug,  it should throw exception');
        } catch(e) {
            assert.equal(true, true);
        }
    });
});/*}}}*/

describe('Packet Reader: method readInteger', function() {//{{{

    it('Read fixed integer', function() {
        var data, test, res;
        data = new Buffer(5);
        data[0] = 0x01;
        data[1] = 0x02; //256 * 2
        data[2] = 0x03;
        data[3] = 0x02; //256 * 2

        test = new packetReader(data);
        res = test.readInteger(2);
        assert.equal(513, res);

        res = test.readInteger(2);
        assert.equal(515, res);

    });


    it('Read out of bound', function() {
        var data, test, res;
        data = new Buffer(2);
        data[0] = 0x01;
        data[1] = 0x02; //256 * 2

        test = new packetReader(data);
        try {
            res = test.readInteger(5);
            assert.equal(true, false, 'bug,  it should throw exception');
        } catch(e) {
            assert.equal(true, true);
        }
    });


});//}}}

describe('Packet Reader: method isTheEnd', function() {//{{{

    it('Normal', function() {
        var data, test, res;
        data = new Buffer(3);
        data[0] = 0x01;
        data[1] = 0x02;
        data[2] = 0x00;

        test = new packetReader(data);
        res = test.isTheEnd();
        assert.equal(false, res);
        
        test.readInteger(3);
        res = test.isTheEnd();
        assert.equal(true, res);

    });

});//}}}

describe('Packet Reader: method passBytes', function() {//{{{

    it('Normal', function() {
        var data, test, res;
        data = new Buffer(5);
        data[0] = 0x01;
        data[1] = 0x02;
        data[2] = 0x03;
        data[3] = 0x04;
        data[4] = 0x05;

        test = new packetReader(data);
        test.passBytes(1);
        res = test.readInteger(1);
        assert.equal(2, res);
 
        test.passBytes(2);
        res = test.readInteger(1);
        assert.equal(5, res);
    });

});//}}}

describe('Packet Reader: method readLengthEncodedInteger', function() {//{{{
    it("One Byte", function() {
        var buf, tester, res, expect;
        var datas = [
          //expect, input
            [1, 1], [2, 2], [250, 250], [null, 251],
            [null, 255]
        ];
        datas.forEach(function (data) {
            buf = new Buffer(2);
            buf[0] = data[1];
            expect = data[0];

            tester = new packetReader(buf);
            res = tester.readLengthEncodedInteger();
            assert.equal(expect, res, "expect value is " + expect + " but actual value is " + res);
        });
    });

    it('Two bytes', function() {
        var data, test, res;
        data = new Buffer(5);
        data[0] = 252;
        data[1] = 0x01;
        data[2] = 0x01;

        test = new packetReader(data);
        res = test.readLengthEncodedInteger();
        assert.equal(257, res, "Fail to get two bytes integer");
    });

    it('Three bytes', function() {
        var data, test, res, expect;
        data = new Buffer(5);
        data[0] = 253;
        data[1] = 0x01;
        data[2] = 0x01;
        data[3] = 0x01;

        expect = (1<< 16) + (1<< 8) + 1;
        test = new packetReader(data);
        res = test.readLengthEncodedInteger();
        assert.equal(expect, res, "Fail to get two bytes integer, actual = " + res);
    });

    it('Eight bytes', function() {
        var data, test, res, expect = 0;
        data = new Buffer(5);
        data[0] = 254;
        for (var i = 1; i <=8 ; i++) {
            data[i] = 0x01;
            expect = ((expect << 8) | 0x01) >>> 0;
        }
        test = new packetReader(data);
        res = test.readLengthEncodedInteger();
        assert.equal(expect, res, "Fail to get two bytes integer, actual = " + res);
    });

});//}}}

describe('Packet Reader: method readLengthEncodedString', function() {//{{{
    it("Normal", function() {
        var buf, tester, res, expect;
        var datas = [
          //expect, length, string
            ["a", 0x01, "a"], ["ab", 0x02, "ab"],
            ["ab", 0x03, "ab"], ["", 0x00, ""]
        ];
        datas.forEach(function (data) {
            expect = data[0];
            buf = new Buffer(data[2].length + 1);
            buf[0] = data[1];
            buf.write(data[2], 1, data[2].length);

            tester = new packetReader(buf);
            res = tester.readLengthEncodedString();
            assert.equal(expect, res, "expect value is " + expect + " but actual value is " + res);
        });
    });

});

describe('Packet Reader: method readFieldsValue', function() {//{{{
    it("Normal", function() {
        var buf, tester, res, expect;
        var datas = [
          //expect, length, string, length, string
            ["test,ab", 0x04, "test", 0x02, "ab"],
            ["1'34,ab,bbb", 0x04, "1'34", 0x02, "ab", 0x03, "bbb"],
        ];
        datas.forEach(function (data) {
            var len, strLength = 0, index = 0;
            len = data.length;
            expect = data[0];
            for (var i = 1; i < len; i+=2) strLength += data[i] + 1;
            buf = new Buffer(strLength);
            for (var i = 1; i < len; i++) {
                if (i % 2 === 1) {
                    buf[index++] = data[i];
                } else {
                    buf.write(data[i], index);
                    index += data[i].length;
                }
            }
            tester = new packetReader(buf);
            res = tester.readFieldsValue();
            assert.equal(expect, res, "expect value is " + expect + " but actual value is " + res);
        });
    });

});

