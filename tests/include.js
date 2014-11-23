//require('./../nodejs/index.js');

var module =  require('./../nodejs/module.js');

console.log(module);

for(var method in module) {
    exports[method] = module[method];
}

