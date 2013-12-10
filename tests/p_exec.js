require("phplike");

exec('ls');


var message = exec('echo "aa"', false);
print_r(message);
