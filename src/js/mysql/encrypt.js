var Crypto = require('crypto');

function encrypt() {

}

var o = encrypt.prototype;

o.sha1 = function(msg) {
  var hash = Crypto.createHash('sha1');
  hash.update(msg, 'binary');
  return hash.digest('binary');
}

o.xor = function(a, b) {
    a = new Buffer(a, 'binary');
    b = new Buffer(b, 'binary');
    var result = new Buffer(a.length);
    for (var i = 0; i < a.length; i++) {
      result[i] = (a[i] ^ b[i]);
    }
    return result;
};

o.encryptPassword = function(password, key) {
    if (!password) {
        return new Buffer(0);
    }

    var stage1 = this.sha1((new Buffer(password, "utf8")).toString("binary"));
    var stage2 = this.sha1(stage1);
    var stage3 = this.sha1(key.toString('binary') + stage2);
    return this.xor(stage3, stage1);
};


module.exports = new encrypt();
