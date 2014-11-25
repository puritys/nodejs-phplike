//require('./../nodejs/index.js');

var module =  require('./../module.js');

for(var method in module) {
    exports[method] = module[method];
}

