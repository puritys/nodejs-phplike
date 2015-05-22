SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/lib   -I/usr/lib
LIBS= -lcurl
#-lcurlpp -I./curlpp/include/
extlib = 
CXXFILE= socket.cc
SO = phplikeCppSocket


include ../../../../conf/Makefile_so.global
all:
#	sudo cp phplikeCppSocket.so /usr/local/lib/node/libphplikeCppSocket.so





ifneq (, $(CYGWIN_PATH))
M_CYGWIN_PATH=$(CYGWIN_PATH)
else
M_CYGWIN_PATH=C:/cygwin64
endif

CWD=`echo $(M_CYGWIN_PATH)$(shell pwd) | sed  's/\//\\\/g'`



gyp:
	gmake clean
	node-gyp configure --CWD=$(CWD)
	node-gyp build
	sudo cp build/Release/phplikeSocket.so build/Release/libphplikeSocket.so
gyp-ins:
	gmake gyp
	sudo cp build/Release/phplikeSocket.$(soExt) /usr/local/lib/node/libphplikeSocket.$(soExt)
	sudo ldconfig
	#sudo cp build/Release/obj.target/phplikeCppCurl/phplikeCppCurl.o /usr/local/lib/node/libphplikeCppCurl.so


