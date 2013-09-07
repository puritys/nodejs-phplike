<h1>Node.js - phplike</h1>

I am a php developer, even my skill of php is not good enough.
I just want to use javascript to do any programing.

This is my first open source, maybe it will be the last too.

This project's purpose is to  porting some useful php function to node.js


Completed PHP Method
* exec
* usleep


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

