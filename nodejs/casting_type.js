exports.is_int = function(n) {
   return typeof(n)=='number'&&parseInt(n)==n;
}

exports.is_string = function(str) {
    return typeof(str)=="string";
}

exports.is_object = function(str) {
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
}
