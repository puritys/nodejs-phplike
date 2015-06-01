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

function array_rand(input, num) {
    var out = [], n, rand, index, isDuplicate, getNum = 1;
    if (!casting.is_array(input)) return "";
    n = input.length;
    if (n <= 0) return "";
    if (num === undefined) num = 1;
    if (n < num) num = n;
    getNum = num;
    if (getNum === 1) {
        rand = Math.floor(Math.random() * n);
        return rand;
    }

    while(getNum > 0) {
        rand = Math.floor(Math.random() * n);
        isDuplicate = false;
        for(index in out) {
            if (out[index] === rand) {
                isDuplicate = true;
                break;
            }
        }
        if (true === isDuplicate) continue;
        out.push(rand);
        getNum--;
    }

    return out;
}

exports.shuffle = shuffle;
exports.array_rand = array_rand;

