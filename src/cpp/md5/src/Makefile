SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/lib   -I/usr/lib
LIBS=
#-lcurlpp -I./curlpp/include/
extlib = 
CXXFILE= md5.cc
SO = phplikeCppMd5


include ../../../../conf/Makefile_so.global
all:
	sudo cp phplikeCppMd5.so /usr/local/lib/node/libphplikeCppMd5.so




ifneq (, $(CYGWIN_PATH))
M_CYGWIN_PATH=$(CYGWIN_PATH)
else
M_CYGWIN_PATH=C:/cygwin64
endif

CWD=`echo $(M_CYGWIN_PATH)$(shell pwd) | sed  's/\//\\\/g'`



gyp:
	node-gyp configure --CWD=$(CWD)
	node-gyp build

gyp-ins:
	gmake gyp
#	sudo cp build/Release/phplikeCppCurl.$(soExt) /usr/local/lib/node/libphplikeCppCurl.$(soExt)
#	sudo ldconfig
	#sudo cp build/Release/obj.target/phplikeCppCurl/phplikeCppCurl.o /usr/local/lib/node/libphplikeCppCurl.so


