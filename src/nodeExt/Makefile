SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -I./includes/ -L/usr/local/lib/node 
LIBS= -lexec -lphplikeCppCurl -lphplikeCppSocket -lphplikeCppXml -lphplikeCppBasic -lphplikeCppMd5
extlib = 
CXXFILE= phplike.cc phplikeCurl.cc phplikeSocket.cc  phplikeXml.cc 
SO = phplike
#include ../conf/Makefile_exe_nodejs.global
include ../../conf/Makefile_so_nodejs.global

all:
	sudo rm -rf ../../build
	sudo mkdir -p ../../build/Release
	sudo mv  phplike.so phplike.node
	sudo mv  phplike.node ../../build/Release/
#	sudo mkdir -p /usr/local/lib/node_modules/phplike/node_modules
#	sudo cp phplike.node  /usr/local/lib/node_modules/phplike/node_modules

gyp-test: gyp mv test

gyp:
	node-gyp configure
	node-gyp build

gyp-ins:
	gmake gyp
	gmake mv
mv:
	sudo rm -rf ../../build
	sudo mv  build/Release/phplike.so build/Release/phplike.node
	sudo mv  build ../../

test:
	sudo ldconfig
	cd ../../ && mocha tests/*.js
	cd ../../ && mocha tests/mysql/*.js

