var phplikeMod = require('./include.js');

var assert = require("assert");

//mocha lib/ --grep _get
describe('Sleep.js', function() {

    it('test sleep a second', function() {

        var date = new Date();
        var time1 = date.getSeconds();
        phplikeMod.usleep(1000*1000);

        date = new Date();
        //console.log("End time = " + date.getMinutes() + ":" +date.getSeconds());

        var time2 = date.getSeconds();

        assert.equal(time2, time1 + 1);
    })

});

