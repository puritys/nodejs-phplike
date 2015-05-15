SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/local/lib/node/ -I./../src/curlpp/include/ -L/usr/lib/ -Wl,-rpath=./../src/build/Release -L./../src/build/Release
LIBS= -lphplikeSocket
extlib = 
CXXFILE= socket.cc
CXXOUTPUT = socket
include ../../../conf/Makefile_exe.global
#include /home/program/lib/Makefile_so.global


ifneq (, $(CYGWIN_PATH))
M_CYGWIN_PATH=$(CYGWIN_PATH)
else
M_CYGWIN_PATH=C:/cygwin64
endif

CWD=`echo $(M_CYGWIN_PATH)$(shell pwd) | sed  's/\//\\\/g'`


gyp:
	gmake clean
	rm -rf build
	node-gyp configure --CWD=$(CWD)
	node-gyp build

gyp-run:
	gmake gyp
	./build/Release/socket

