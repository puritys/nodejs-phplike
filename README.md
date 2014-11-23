<h1>Node.js - phplike</h1>

This project's purpose is to  porting some useful php function to node.js

Support synchronous exec to prevent node.js too many callback function, it will make the code easier to maintain.


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
* is_file, is_dir
* substr (string, start, length)
* readdir (get all file list in select directory)
* chr, ord : string to ascii number, ascii number to string
* decbin, bindec



<h2>Install phplike</h2>

* sudo npm install -g phplike

This package need node-gyp. you should install node-gyp first. npm will auto install node-gyp before you install phpliek.

* sudo npm install -g node-gyp


Execute phplike sample code
-------------------------------

exec(command, printInScreen); 

<pre>
    require("phplike");
    var tm = time();
    sleep(10);
    var result = exec("ls -la");
    print_r(result);
</pre>



======== phplike development  notes ===========

<h2>Install Node.js</h2>

<ul>
    <li>Download node.js source code</li>
    <li>./configure && make </li>
    <li>sudo cp node /usr/local/bin/</li>
    <li>sudo cp out/Release/*.a /usr/local/lib/node/</li>
    <li>sudo cp deps/v8/include/*.h /usr/local/include/node/</li>
    <li>sudo cp deps/uv/include/*.h /usr/local/include/node/</li>
    <li>sudo cp deps/uv/include/uv-private/uv-linux.h /usr/local/include/node/uv-private/</li>
    <li>sudo cp deps/uv/include/uv-private/uv-unix.h /usr/local/include/node/uv-private/</li>

</ul>

<h2>Compile Node.js addon</h2>
g++ source.cc  -L/usr/local/lib/node -I/usr/local/lib/node  -lpthread /usr/local/lib/node/libv8_base.a -lrt  -ldl  

<h2>How to publish a new package</h2>
* Create user
<pre>
npm adduser
</pre>
* Login
<pre>
npm login
</pre>
* Build release code
<pre>
cd ../ npm build  phplike
</pre>
* Publish package , phplike should be a folder
<pre>
cd ../ npm publish phplike
</pre>



npm
---

* https://npmjs.org/package/phplike
* 


# 中文 phplike Readme

這個 project 主要是讓習慣 php 開發的工程師，能夠快速適應  Node.js ， 我實作了部分 php 相關的 function。

安裝方式可以用 npm install，但是 phplike 目前只支援  Linux 系統，用 windows 系統會遇到 compile fail 的訊息。

