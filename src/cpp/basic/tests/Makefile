SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/local/lib/node/ -Wl,-rpath=./../src/build/Release/ -L./../src/build/Release  
LIBS= -pthread  -lgtest -lphplikeCppBasic
extlib = 
CXXFILE= string.cc
CXXOUTPUT = test
include ../../../../conf/Makefile_exe.global


ifneq (, $(CYGWIN_PATH))
M_CYGWIN_PATH=$(CYGWIN_PATH)
else
M_CYGWIN_PATH=C:/cygwin64
endif

CWD=`echo $(M_CYGWIN_PATH)$(shell pwd) | sed  's/\//\\\/g'`


gyp:
	node-gyp configure --CWD=$(CWD)
	node-gyp build --release --verbose
	./build/Release/test
