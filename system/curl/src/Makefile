SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/lib   -I/usr/lib
LIBS= -lcurl
#-lcurlpp -I./curlpp/include/
extlib = 
CXXFILE= util.cc phplikeCppCurl.cc
SO = phplikeCppCurl


include ../../../conf/Makefile_so.global
all:
	sudo cp phplikeCppCurl.so /usr/local/lib/node/libphplikeCppCurl.so
gyp:
	node-gyp configure
	node-gyp rebuild

gyp-ins:
	gmake gyp
	sudo cp build/Release/phplikeCppCurl.$(soExt) /usr/local/lib/node/libphplikeCppCurl.$(soExt)
	sudo ldconfig
	#sudo cp build/Release/obj.target/phplikeCppCurl/phplikeCppCurl.o /usr/local/lib/node/libphplikeCppCurl.so


