Required package
-----------------
* npm install bindings
* npm install node-gyp



Package information
-------------------

https://github.com/npm/npm/blob/master/doc/files/package.json.md


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

