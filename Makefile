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

buildDocker:
#	docker build -t nodejs-phplike/node-6.3:latest -f docker/node-6.3 .
#	docker build -t nodejs-phplike/centos-7-node-0.12:latest -f docker/centos-7-node-0.12 .
	docker build -t nodejs-phplike/centos-6-node-7.8:latest -f docker/centos-6-node-7.8 .

root:
	bash -c 'docker rm -f node-7.8' 2>&1 || true
	docker run -it --name node-7.8 nodejs-phplike/centos-6-node-7.8:latest /bin/bash

dockerTestNode-7.8-centos-6:
	docker stop centos-6-node-7.8 2>&1 || true
	bash -c 'docker rm -f node-7.8' 2>&1 || true
	docker run -d -t --name node-7.8 nodejs-phplike/centos-6-node-7.8:latest /bin/bash
#	docker exec -i node-6.3 /usr/bin/git clone https://github.com/puritys/nodejs-phplike.git
	docker exec -i node-7.8 bash -c  'cd nodejs-phplike && git pull && make gyp && make test' | tee result.node-7.8

dockerTestNode-6.3:
	docker stop node-6.3 2>&1 || true
	bash -c 'docker rm -f node-6.3' 2>&1 || true
	docker run -d -t --name node-6.3 nodejs-phplike/node-6.3:latest /bin/bash
#	docker exec -i node-6.3 /usr/bin/git clone https://github.com/puritys/nodejs-phplike.git
	docker exec -i node-6.3 bash -c  'cd nodejs-phplike && git pull && make gyp && make test' | tee result.node-6.3

dockerTestNode-0.12:
	docker stop node-0.12 2>&1 || true
	bash -c 'docker rm -f node-0.12' 2>&1 || true
	docker run -d -t --name node-0.12 nodejs-phplike/centos-7-node-0.12:latest /bin/bash
#	docker exec -i node-6.3 /usr/bin/git clone https://github.com/puritys/nodejs-phplike.git
	docker exec -i node-0.12 bash -c  'cd /root/nodejs-phplike && git pull && make gyp && make test' | tee result.node-0.12


#npm adduser
#npm publish
#npm unpublish
