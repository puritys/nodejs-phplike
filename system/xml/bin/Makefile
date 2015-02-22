SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/lib   -I/usr/lib -I./../src/ -Wl,-rpath=./../src/build/Release/ -L./../src/build/Release/
LIBS= -ltinyxml2
extlib = 
CXXFILE= test.cc
CXXOUTPUT = test


include ../../../conf/Makefile_exe.global


#all:
#	sudo cp phplikeCppCurl.so /usr/local/lib/node/libphplikeCppCurl.so





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

gyp-ins:
	gmake gyp
	sudo cp build/Release/phplikeCppCurl.$(soExt) /usr/local/lib/node/libphplikeCppCurl.$(soExt)
	sudo ldconfig
	#sudo cp build/Release/obj.target/phplikeCppCurl/phplikeCppCurl.o /usr/local/lib/node/libphplikeCppCurl.so


