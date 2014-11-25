var casting = require('./casting_type.js');

exports.array_merge = function (arr1, arr2) {
    var res, pro;
    if (casting.is_array(arr1) && casting.is_array(arr2)) {
        res = arr1.concat(arr2);
    } else if (casting.is_object(arr1) && casting.is_object(arr2)) {
        res = {};
        for(pro in arr1) {
            res[pro] = arr1[pro];
        }
        for(pro in arr2) {
            res[pro] = arr2[pro];
        }
    }
    return res;
};
