
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

mocha-test:
	cd tests && mocha *

#npm adduser
#npm publish
#npm unpublish
