SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/lib   -I/usr/lib
LIBS=
extlib = 
CXXFILE= tinyxml2.cpp
SO = phplikeCppXml


include ../../../../conf/Makefile_so.global

all:
	echo " xxxxxxx"


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


#xmltest: xmltest.cpp tinyxml2.cpp tinyxml2.h
#test: clean xmltest
#	./xmltest
#clean:
#	rm -f *.o xmltest
