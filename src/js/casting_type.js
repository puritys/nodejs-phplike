exports.is_int = function(n) {
   return typeof(n)=='number'&&parseInt(n)==n;
}

exports.is_string = function(str) {
    return typeof(str)=="string";
}

exports.is_object = function(str) {
    if (str instanceof Array) return false;
    return typeof(str)=="object";
}

exports.is_array = function(data) {
    if ( data instanceof Array){
        return true;
    }
    return false;
}

exports.is_numeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


/** casting convert **/

exports.intval = function (val) {
    if (!val) return 0;
    val = val.toString().replace(/^[^0-9]+/, '').replace(/[^0-9]+$/, '');
    return parseInt(val, 10);
};

exports.strval = function (val) {
    return val.toString();
};




