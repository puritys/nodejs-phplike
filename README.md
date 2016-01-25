Node.js - phplike
=======================

Chinese Readme: https://github.com/puritys/nodejs-phplike/wiki/%E4%B8%AD%E6%96%87%E7%89%88-Readme


This project's purpose is to implement some useful PHP functions for Node.js and Io.js.

Node.js is a event-driven language and it has many asynchronous methods. The asynchronous IO is not a bad way for a web system. But sometimes, we want to make code readable and easier to keep better maintenance. The phplike supports many synchronous functions for Node.js.

In order to reduce the number of callback functions on Node.js scripts. Phplike supports many synchronous functions such as "exec", "curl", "fsockopen" that can execute without callback functions. Using phplike will make the code has better readability and maintenance. In additional, phplike provide the function cUrl which is just the same function with php's function called curl. It will let you make a HTTP request synchronously. 


* npm: https://npmjs.org/package/phplike
* All version: https://registry.npmjs.org/phplike
* Git Source: https://github.com/puritys/nodejs-phplike


Travis CI status: [![Unit testing](https://travis-ci.org/puritys/nodejs-phplike.png?branch=master)](https://travis-ci.org/puritys/nodejs-phplike) [![Coverage Status](https://coveralls.io/repos/puritys/nodejs-phplike/badge.png?branch=master)](https://coveralls.io/r/puritys/nodejs-phplike?branch=master)

<img src="https://camo.githubusercontent.com/fe2d9e9063dabaf5951ef8f3835bbbc16cec52e3/68747470733a2f2f706f7365722e707567782e6f72672f7a6f72646975732f6c696768746e63616e64792f6c6963656e73652e737667" alt="license">


## Install phplike

* sudo npm install -g phplike

If your computer is not a normal OS, and it doesn't have the header files of Curl, You will need to install node-gyp first. The installation of phplike library will compile the C/C++ code with node-gyp. Usually, NPM will automatically install node-gyp when you try to install phplike. Or you can install node-gyp by yourself.

* sudo npm install -g node-gyp

```
   var php = require("phplike/module");
   var dirs = php.exec("ls ./");
   php.print_r(dirs);
```

How many OS does phplike support?
---------------------------
* Linux : Every version of phplike support linux systems.
* Mac :  Supported from phplike@2.0.5  to  latest 
* Windows: Only the following version are supported: phplike@2.1.0 、 phplike@2.2.8 , phplike@2.4.4 . I have tested features of phplike on windows 8 and windows xp.
* Raspberry PI (Pidora OS with ARM CPU): phplike@2.2.2 ~ Latest

| OS       | Suggested phplike Version |
|----------|:-------------:|
| Linux    | Latest |
| Mac      | 2.0.5  ~ latest |
| Windows  | 2.2.8, 2.4.2 |
| Raspberry PI | 2.2.2 ~ latest |

If you have any issue for installing phplike, please open a issue in anytime. I will be pleasant to help you.
 
Dependency
-----------
* Phplike have been already tested in Node.js version from 0.10.x to 0.12.x and io.js 1.0.0 to 2.1.0. Here is the test report : https://travis-ci.org/puritys/nodejs-phplike 
* libcurl (libcurl-7.19) : Linux system already have this built-in package. Please install libcurl-devel :  sudo yum install  libcurl-devel
* python 2.4 ~ :  phplike use node-gyp to compile C/C++ codes. It needs python with the version must be bigger than 2.7.8 , you can download python from here https://www.python.org/downloads/.

After the new version of phplike 2.2.0, I committed all binary files which already compiled in Windows, Mac and Linux, you can just install the phplike without compiling C/C++ now.


Completed PHP Method
-------------------------

**System function**

* <a href="https://github.com/puritys/nodejs-phplike/wiki/function-exec">exec</a> : Execute an external program
* system
* <a href="https://github.com/puritys/nodejs-phplike/wiki/Curl">curl</a> : curl_init, curl_setopt, curl_exec, curl_close, reuqest ( HTTP sync )
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
* explode
* implode

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
* strtolower
* strtoupper

**XML Parser**
<a href="https://github.com/puritys/nodejs-phplike/wiki/XML-Parser">XML Parser Document</a>

* DOMDocument
 * getElementsByTagName

* DOMElement
 * firstChild
 * lastChild
 * hasAttributes

**Socket**

* fsockopen
* sendcmd
* fwrite
* fread

**<a href="https://github.com/puritys/nodejs-phplike/wiki/Mysql-in-Node.js">Mysql</a>**

* mysqli_connect
* mysql_connect
* mysql_select_db
* mysql_query
* mysql_close
* mysql_create_db
* mysql_insert_id

**array**

* shuffle
* array_merge
* array_rand

**Others**

* time, date, mktime
* chr, ord : string to ascii number, ascii number to string
* decbin, bindec
* parse_str : parse "a=b&c=d" to {"a": "b", "c": "d"}
* clone:  clone a object or array
* getcwd
* urlencode, urldecode
* intval: convert string to integer
* strval: convert integer to string
* trim
* http_build_query




Execute phplike in global mode sample
-------------------------------

If you require the index.js of phplike, then you can use the phplike's functions in global object. It means that you don't need the prefix to call the phplike's function. To execute functions like a real php coding. 

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

You can require module.js of phplike, then you will need prefix to call phplike function, the module mode will not change the method of global object and can separate the Phplike's functions from native Node.js functions .

```
    var php = require("phplike/module.js");
    var tm = php.time();
    php.sleep(10);
    var result = php.exec("ls -la");
    php.print_r(result);
```


Example code for php curl 
------------------------------
```
    require('phplike');
    
    var url = "https://www.google.com.tw/search?q=php+unit+test";
    var header = {"Cookie": "xxx"};
    
    var c = curl_init();
    curl_setopt(c, 'CURLOPT_URL', url);
    var res = curl_exec(c);
    
    curl_close(c);
    
    console.log("respones = " + res);
```

Example code for php post (Using module mode)
------------------------------

```
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
```

Example code for making a blocking request 
------------------------------------------
```
    var phplikeMod = require('phplike/module.js');

    var url = "http://localhost:8080/";
    var param = {"q": "x"};
    var header = {"Cookie": "xxx"};
    var res = phplikeMod.request("GET", url, param, header);
```

Functions will be implemented in the future
------------------------------------------
* abs
* acos

phplike Development
------------------
* Visual studio: Windows will need this software in order to compile C/C++ code,  you can download from here  http://www.visualstudio.com/zh-tw/downloads/download-visual-studio-vs#DownloadFamilies_4 .  Notice! If you install vs2010 Express, it only support 32bit, so you should install the 32bit version Node.js too.
 




