<h1>Node.js - phplike</h1>

This project's purpose is to  implement some useful php function to node.js

Support synchronous exec to prevent node.js too many callback function, it will make the code easier to maintain.

Phplike can not execute in windows system now, I only have time to support Linux and Mac.

* npm: https://npmjs.org/package/phplike
* Git Source: https://github.com/puritys/nodejs-phplike
 

Travis CI status: [![Unit testing](https://travis-ci.org/puritys/nodejs-phplike.png?branch=master)](https://travis-ci.org/puritys/nodejs-phplike) 



Dependency
-----------
* libcurl (libcurl-7.19)

If you install the phplike 2.0 , you will need libcurl package, because phplike support curl in version 2.0.


<h2>Completed PHP Method</h2>
* exec , system
* usleep , sleep
* print_r
* is_string
* is_int
* is_object
* is_array
* is_numeric
* is_int
* base64_encode
* base64_decode
* str_pad
* time
* date
* sprintf (need latest v8 engine!)
* exit
* file_get_contents
* file_put_contents
* mkdir
* unlink
* rmdir (dirname, isForce)
* isset
* empty (phplike 2.0)
* is_file, is_dir
* substr (string, start, length)
* readdir (get all file list in select directory)
* chr, ord : string to ascii number, ascii number to string
* decbin, bindec



<h2>Install phplike</h2>

* sudo npm install -g phplike

This package need node-gyp. you should install node-gyp first. npm will auto install node-gyp before you install phpliek.

* sudo npm install -g node-gyp


Execute phplike in global mode sample
-------------------------------

You can require the index.js of phplike, then you will use the phplike function in global object. It means that you don't need prefix to call php function. To execute function like a real php. 

exec(command, printInScreen); 

<pre>
    require("phplike");
    var tm = time();
    sleep(10);
    var result = exec("ls -la");
    print_r(result);
</pre>

Execute phplike in module mode sample (phplike 2.0)
------------------------------

You can require module.js of phplike, then you will need prefix to call phplike function, the module mode will not change the method of global object and can separate both of php and node.js.

<pre>
    var phpmod = require("phplike/module.js");
    var tm = phpmod.time();
    phpmod.sleep(10);
    var result = phpmod.exec("ls -la");
    phpmod.print_r(result);
</pre>



Functions will be implemented in the future
------------------------------------------
* curl (phplike 2.0,  almost done)
* intval: convert string to integer
* strval: convert integer to string
* abs
* acos
* strtolower
* strtoupper


# 中文 phplike Readme

這個 project 主要是讓習慣 php 開發的工程師，能夠快速適應  Node.js ， 我實作了部分 php 相關的 function。

安裝方式可以用 npm install，但是 phplike 目前只支援  Linux 系統，用 windows 系統會遇到 compile fail 的訊息。


安裝方式： 
----------
* npm install phplike
* sudo /usr/local/bin/npm install -g phplike

必備軟體
-------------------

因為 phplike 有使用到 c/c++ 程式，所以有些必備的軟體必需要安裝。

* Linux: 
* libcurl: phplike 2.0 支援  curl function ，底層就是使用軟體 libcurl 。


phplike 支援兩種 require 模式
------------------------------

第一種是完全實現 php function 的使用方式，所有的 function 都會變成 global function，你只要呼叫 php function 就能直接使用，優點是程式只要 require 一次，然後每個 module 都可以使用，使用範例如下。

<pre>
    require("phplike");
    var tm = time();
    sleep(10);
    var result = exec("ls -la");
    print_r(result);
</pre>


第二種則是將所有的 phplike function 宣告在 Node.js Module 裡，使用的時候，必需要先 require phplike module.js，因為不是  global function ，所有每個檔案都會 require phplike 才能正確執行，使用範例如下。

<pre>
    var phpmod = require("phplike/module.js");
    var tm = phpmod.time();
    phpmod.sleep(10);
    var result = phpmod.exec("ls -la");
    phpmod.print_r(result);
</pre>


