SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/lib   -I/usr/lib
LIBS= -lcurl
#-lcurlpp -I./curlpp/include/
extlib = 
CXXFILE= string.cc
SO = phplikeCppBasic


include ../../../../conf/Makefile_so.global
all:
	sudo cp phplikeCppBasic.so /usr/local/lib/node/libphplikeCppBasic.so





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
	cd build/Release && cp phplikeCppBasic.so libphplikeCppBasic.so
gyp-ins:
	gmake gyp
	sudo cp build/Release/phplikeCppBasic.$(soExt) /usr/local/lib/node/libphplikeCppBasic.$(soExt)
	sudo ldconfig


