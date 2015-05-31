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

function shuffleObject(obj) {
    var res = {}, key, rand, tmp, ay = [], i = 0;
    for (key in obj) {
        ay[i] = {key:key, val: obj[key]};
        i++;
    }
    shuffle(ay);
    ay.map(function (val, index) {
        res[val.key] = val.val;
    });
    return res;
}

function shuffle(ay) {
    var rand, n, o;
    if (casting.is_object(ay)) {
        return shuffleObject(ay);
    }
    n = ay.length;
    ay.map(function (v, index) {
        rand = Math.floor(Math.random() * n);
        o = v;
        ay[index] = ay[rand];
        ay[rand] = o;
    });
    return ay;
};

exports.shuffle = shuffle;
