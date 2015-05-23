SRC_PATH=$(shell pwd)
CC=g++
CFLAGS=   
LIBS= -std=gnu++0x 
extlib = 
CXXFILE= exec.cc
SO = exec
include ../../../../conf/Makefile_so.global
all:
	sudo cp  exec.so /usr/local/lib/node/libexec.so


ifneq (, $(CYGWIN_PATH))
M_CYGWIN_PATH=$(CYGWIN_PATH)
else
M_CYGWIN_PATH=C:/cygwin64
endif

CWD=`echo $(M_CYGWIN_PATH)$(shell pwd) | sed  's/\//\\\/g'`


gyp:
	gmake clean
	node-gyp configure --CWD=$(CWD)
	node-gyp build --release
	cd build/Release && cp phplikeCppExec.so libphplikeCppExec.so

gyp-ins:
	gmake gyp
	sudo cp build/Release/phplikeCppExec.$(soExt) /usr/local/lib/node/libphplikeCppExec.$(soExt)
	sudo ldconfig


