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

dockerTestNode-6.3:
	docker stop node-6.3 2>&1 || true
	bash -c 'docker rm -f node-6.3' 2>&1 || true
	docker run -d -t --name node-6.3 e0ccf8ebb48b /bin/bash
	docker exec -i node-6.3 /usr/bin/git clone https://github.com/puritys/nodejs-phplike.git
	docker exec -i node-6.3 bash -c  'cd nodejs-phplike/ && npm install --dev && make gyp && make test' | tee result.node-6.3



#npm adduser
#npm publish
#npm unpublish
