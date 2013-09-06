var phplike = require ('./../nodejs/phplike');
var date = new Date();
console.log("start time = " + date.getMinutes() + ":" +date.getSeconds());
phplike.usleep(2000*1000);

date = new Date();
console.log("End time = " + date.getMinutes() + ":" +date.getSeconds());



