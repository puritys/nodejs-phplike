SRC_PATH=$(shell pwd)
CC=g++
CFLAGS=  -L/usr/local/lib/node 
LIBS= -lexec
extlib = 
CXXFILE= phplike.cc
SO = phplike
#include /usr/local/devlib/Makefile_exe_nodejs.global
include /home/program/lib/Makefile_so_nodejs.global
all:
	sudo mv  phplike.so ./phplike.node
	sudo mkdir -p /usr/local/lib/node_modules/phplike/node_modules
	sudo cp phplike.node  /usr/local/lib/node_modules/phplike/node_modules
	sudo cp phplike.js  /usr/local/lib/node_modules/phplike/index.js
	sudo cp casting_type.js  /usr/local/lib/node_modules/phplike/casting_type.js

