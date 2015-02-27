Node.js - phplike
=======================

This project's purpose is to  implement some useful php function to node.js.

The second point is that Node.js is a event-driven language and it's method usually have asynchronous IO. phplike make  Node.js to execute with synchronous IO.

phplike support synchronous exec function to run system code without callback. It can reduce number of callback functions, also will make the code easier to maintain, and phplike provide cUrl  which just like php curl function. You can make a request synchronously. 

* npm: https://npmjs.org/package/phplike
* All version: https://registry.npmjs.org/phplike
* Git Source: https://github.com/puritys/nodejs-phplike
 

Travis CI status: [![Unit testing](https://travis-ci.org/puritys/nodejs-phplike.png?branch=master)](https://travis-ci.org/puritys/nodejs-phplike) [![Coverage Status](https://coveralls.io/repos/puritys/nodejs-phplike/badge.png?branch=master)](https://coveralls.io/r/puritys/nodejs-phplike?branch=master)

<img src="https://camo.githubusercontent.com/fe2d9e9063dabaf5951ef8f3835bbbc16cec52e3/68747470733a2f2f706f7365722e707567782e6f72672f7a6f72646975732f6c696768746e63616e64792f6c6963656e73652e737667" alt="license">

How many OS does phplike support?
---------------------------
* Linux : Every version of phplike support linux system.
* Mac :  Supported from phplike@2.0.5  to  latest 
* Windows: Supported only in phplike@2.1.0 、 phplike@2.2.8 , I had ever test phplike in windows 8 and windows xp.
* Raspberry PI(Pidora OS with ARM CPU): phplike@2.2.2 ~

| OS       | Suggested phplie Version |
|----------|:-------------:|
| Linux    | Latest |
| Mac      | 2.0.5  ~ latest |
| Windows  | 2.2.8 |
| Raspberry PI | 2.2.2 ~ latest |

Dependency
-----------
* libcurl (libcurl-7.19) : Linux system should have this package.
* python 2.4 ~ :  phplike use node-gyp to compile C/C++ codes. It needs python which version must be bigger than 2.7.8, you can download python from here https://www.python.org/downloads/.

After the new version of phplike 2.2.0, I committed all binary file which already compiled in Windows, Mac and Linux, you can just install the phplike without compiling C/C++ now.


Completed PHP Method
-------------------------

**System function**

* <a href="https://github.com/puritys/nodejs-phplike/wiki/function-exec">exec</a> : Execute an external program
* system
* <a href="https://github.com/puritys/nodejs-phplike/wiki/Curl">curl</a> : curl_init, curl_setopt, curl_exec, curl_close
* usleep , sleep

**basic**
* print_r
* is_string
* is_int
* is_object
* is_array
* is_numeric
* is_int
* isset
* empty
* exit

**File Handler**
* file_get_contents
* file_put_contents
* mkdir
* unlink
* rmdir (dirname, isForce)
* is_file, is_dir
* readdir (get all file list in select directory)

**Encoder and Decoder**

* json_encode, json_decode, handle multibyte: json_decode(xx, 'JSON_UNESCAPED_UNICODE')
* md5
* base64_encode
* base64_decode

**String**

* sprintf
* str_pad
* substr (string, start, length)

**XML Parser**

* DOMDocument
 * getElementsByTagName

* DOMNode
 * firstChild
 * lastChild
 * hasAttributes

**Others**

* time, date, mktime
* chr, ord : string to ascii number, ascii number to string
* decbin, bindec
* parse_str : parse "a=b&c=d" to {"a": "b", "c": "d"}
* array_merge
* clone:  clone a object or array
* getcwd
* urlencode, urldecode
* intval: convert string to integer
* strval: convert integer to string
* trim
* http_build_query


<h2>Install phplike</h2>

* sudo npm install -g phplike

If your computer has a not common OS, then you will need to install node-gyp first. Phplike compile C/C++ code  using node-gyp module. Usually, NPM will auto install node-gyp when you install phplike.

* sudo npm install -g node-gyp


Execute phplike in global mode sample
-------------------------------

You can require the index.js of phplike, then you will use the phplike function in global object. It means that you don't need prefix to call php function. To execute function like a real php coding. 

exec(command, printInScreen = true); 

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
    var php = require("phplike/module.js");
    var tm = php.time();
    php.sleep(10);
    var result = php.exec("ls -la");
    php.print_r(result);
</pre>


Example code for php curl 
------------------------------
<pre>
    require('phplike');
    
    var url = "https://www.google.com.tw/search?q=php+unit+test";
    var header = {"Cookie": "xxx"};
    
    var c = curl_init();
    curl_setopt(c, 'CURLOPT_URL', url);
    var res = curl_exec(c);
    
    curl_close(c);
    
    console.log("respones = " + res);

</pre>

Example code for php post (Using module mode)
------------------------------
<pre>
    var php = require("phplike/module.js");
    var url = "http://localhost:8080/";
    var param = {"q": "x"};
    var header = {"Cookie": "xxx"};
    var c = php.curl_init();
    php.curl_setopt(c, 'CURLOPT_URL', url);
    php.curl_setopt(c, 'CURLOPT_POST', 1);
    php.curl_setopt(c, 'CURLOPT_POSTFIELDS', "a=bbb&c=eee");
    php.curl_setopt(c, 'CURLOPT_HTTPHEADER', header);
    var res = php.curl_exec(c);
    var responseHeader = php.getResponseHeader(); // Get header

</pre>

Example code for making a blocking request 
------------------------------------------
<pre>
    var phplikeMod = require('phplike/module.js');

    var url = "http://localhost:8080/";
    var param = {"q": "x"};
    var header = {"Cookie": "xxx"};
    var res = phplikeMod.request("GET", url, param, header);

</pre>

Functions will be implemented in the future
------------------------------------------
* explode
* implode
* abs
* acos
* strtolower
* strtoupper
* XML DOMDocument


phplike Development
------------------
* Visual studio: Windows will need this software in order to compile C/C++ code,  you can download from here  http://www.visualstudio.com/zh-tw/downloads/download-visual-studio-vs#DownloadFamilies_4 .  Notice! If you install vs2010 Express, it only support 32bit, so you should install the 32bit version Node.js too.
 


# 中文 phplike Readme

這個 project 主要是讓習慣 php 開發的工程師，能夠快速適應  Node.js ， 我實作了部分 php 相關的 function。
 

支援的 OS
----------
* Linux
* Wdinwos
* Mac
* Raspberry PI: Fedora

安裝方式： 
----------
* npm install phplike
* sudo /usr/local/bin/npm install -g phplike

必備軟體
-------------------

因為 phplike 有使用到 c/c++ 程式，所以有些必備的軟體必需要安裝。

* Linux : 在 phplike 2.0 版本後，已經支援  php curl function ，而底層是使用軟體 libcurl ，所以 Linux 系統必須要安裝這個軟體，當然大部分的 Linux OS 都已經有內建了。
* Windows: None


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


