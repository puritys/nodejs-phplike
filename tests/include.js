//require('./../nodejs/index.js');
global.UNIT_TEST = true;

var module =  require('./../module.js');

for(var method in module) {
    exports[method] = module[method];
}

