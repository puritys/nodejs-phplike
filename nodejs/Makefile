SRC_PATH=$(shell pwd)
CC=g++
CFLAGS=  -L/usr/local/lib/node 
LIBS= -lexec
extlib = 
CXXFILE= phplike.cc
SO = phplike
#include ../conf/Makefile_exe_nodejs.global
include ../conf/Makefile_so_nodejs.global
all:
	sudo mv  phplike.so ./phplike.node
	sudo cp  phplike.node ./node_modules/
	sudo mkdir -p /usr/local/lib/node_modules/phplike/node_modules
	sudo cp phplike.node  /usr/local/lib/node_modules/phplike/node_modules
	sudo cp index.js  /usr/local/lib/node_modules/phplike/
	sudo cp casting_type.js  /usr/local/lib/node_modules/phplike/casting_type.js


