global.is_int = function(n) {
   return typeof(n)=='number'&&parseInt(n)==n;
}

global.is_string = function(str) {
    return typeof(str)=="string";
}

global.is_object = function(str) {
    return typeof(str)=="object";
}

global.is_array = function(data) {
    if ( data instanceof Array){
        return true;
    }
    return false;
}

global.is_numeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
