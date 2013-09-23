<h1>Node.js - phplike</h1>

I am a php developer, even my skill of php is not good enough.
I just want to use javascript to do any programing.

This is my first open source, maybe it will be the last too.

This project's purpose is to  porting some useful php function to node.js


<h2>Completed PHP Method</h2>
* exec
* usleep
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
* sprintf
* exit
* file_get_contents
* file_put_contents
* unlink

<h2>Install phplike</h2>

* sudo npm install -g phplike

This package need node-gyp. you should install node-gyp first.

* sudo npm install -g node-gyp


<h2>Execute phplike sample</h2>
<pre>
    var tm = time();
    sleep(10);
</pre>


 ======== development ===========

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

