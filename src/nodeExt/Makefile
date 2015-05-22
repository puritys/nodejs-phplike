SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -I./includes/ -L/usr/local/lib/node 
LIBS= -lexec -lphplikeCppCurl
extlib = 
CXXFILE= phplike.cc phplikeCurl.cc phplikeSocket.cc  phplikeXml.cc 
SO = phplike
#include ../conf/Makefile_exe_nodejs.global
include ../../conf/Makefile_so_nodejs.global
all:
	sudo mv  phplike.so ./phplike.node
	sudo cp  phplike.node ./node_modules/
	sudo mkdir -p /usr/local/lib/node_modules/phplike/node_modules
	sudo cp phplike.node  /usr/local/lib/node_modules/phplike/node_modules

gyp:
	node-gyp configure
	node-gyp build
