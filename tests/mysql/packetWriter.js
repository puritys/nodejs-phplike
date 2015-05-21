var phplikeMod = require('./../include.js');

var assert = require("assert");
var packetWriter = require('./../../nodejs/mysql/packetWriter.js');

//mocha lib/ --grep Packet
describe('Packet Write: method writeString', function() {/*{{{*/

    it('Write fixed string', function() {
        var buf, str, test = new packetWriter();
        test.writeString("test");
        buf = test.getResult();
        assert.equal(0x04, buf[0]);
        assert.equal("t", String.fromCharCode(buf[4]));
        assert.equal("e", String.fromCharCode(buf[5]));
        assert.equal("t", String.fromCharCode(buf[7]));
    });

    it('Write null', function() {
        var buf, test = new packetWriter();
        buf = test.writeString();
        assert.equal("", buf);
    });

    it('Write string with null', function() {
        var buf, test = new packetWriter();
        test.writeStringWithNull("test");
        buf = test.getResult();
        assert.equal(0x05, buf[0], "actual value = " + buf[0]);
        assert.equal("t", String.fromCharCode(buf[4]));
        assert.equal("t", String.fromCharCode(buf[7]));
        assert.equal(0x00, buf[8]);

    });


});/*}}}*/

describe('Packet Write: method writeInteger', function() {/*{{{*/

    it('Write integer', function() {
        var buf, test = new packetWriter();
        test.writeInteger(1, 10);
        buf = test.getResult();
        assert.equal(0x0a, buf[4], "buf[4] should be equal to 10 , actual value = " + buf[4]);

    });

});/*}}}*/

describe('Packet Write: method writeBuffer', function() {/*{{{*/

    it('Normal', function() {
        var buf, data, test = new packetWriter();
        data = new Buffer(3);
        data[0] = 0x01; data[1] = 0x02; data[2] =0x03;
        test.writeBuffer(data);
        buf = test.getResult();
        assert.equal(0x02, buf[5], "buf[5] should be equal to 2 , actual value = " + buf[5]);
        assert.equal(0x03, buf[6], "buf[6] should be equal to 3 , actual value = " + buf[6]);

    });

});/*}}}*/



