SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/lib   -I/usr/lib
LIBS= -lcurl
#-lcurlpp -I./curlpp/include/
extlib = 
CXXFILE=
SO =


include ../../conf/Makefile_so.global


#all:
#	sudo cp phplikeCppCurl.so /usr/local/lib/node/libphplikeCppCurl.so





ifneq (, $(CYGWIN_PATH))
M_CYGWIN_PATH=$(CYGWIN_PATH)
else
M_CYGWIN_PATH=C:/cygwin64
endif

CWD=`echo $(M_CYGWIN_PATH)$(shell pwd) | sed  's/\//\\\/g'`



gyp:
	cp binding.gyp src/
	cd src && gmake clean
	cd src && node-gyp configure --CWD=$(CWD)
	cd src && node-gyp build

gyp-ins:
	gmake gyp
	sudo cp build/Release/phplikeCppCurl.$(soExt) /usr/local/lib/node/libphplikeCppCurl.$(soExt)
	sudo ldconfig
	#sudo cp build/Release/obj.target/phplikeCppCurl/phplikeCppCurl.o /usr/local/lib/node/libphplikeCppCurl.so


