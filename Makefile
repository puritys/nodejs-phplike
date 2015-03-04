clone:
	git clone git@github.com:puritys/nodejs-phplike-binary.git ./binary
all:
	cd system/exec && gmake  
	cd nodejs && gmake

gyp:
	node-gyp configure
	node-gyp build
#	sudo cp build/Release/nodejs-phplike.node /usr/local/lib/node_modules/phplike/node_modules/phplike.node

gyp-test:
	node-gyp configure
	node-gyp build
	sudo cp build/Release/nodejs-phplike.node /usr/local/lib/node_modules/phplike/node_modules/phplike.node

mocha:
	mocha tests/*.js

#npm adduser
#npm publish
#npm unpublish
