clone:
	git clone git@github.com:puritys/nodejs-phplike-binary.git ./binary

all:
	cd src/cpp && make  
	cd src/nodeExt && make

gyp:
	node-gyp configure
	node-gyp build
#	sudo cp build/Release/nodejs-phplike.node /usr/local/lib/node_modules/phplike/node_modules/phplike.node

gyp-test:
	node-gyp configure
	node-gyp build
#	sudo cp build/Release/nodejs-phplike.node /usr/local/lib/node_modules/phplike/node_modules/phplike.node

test: mocha

mocha:
	mocha tests/*.js
	mocha tests/mysql/*.js


deployPreTest:
	gmake mocha
	sudo npm install -g
	mocha tests/manualTest/global.sjs


#npm adduser
#npm publish
#npm unpublish
