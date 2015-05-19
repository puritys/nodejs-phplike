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

    it('Read a c string', function() {
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

describe('Packet Reader: method readInteger', function() {

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


});

