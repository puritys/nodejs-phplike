SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/lib   -I/usr/lib
LIBS= -lcurl
#-lcurlpp -I./curlpp/include/
extlib = 
CXXFILE= phplikeCppCurl.cc
SO = phplikeCppCurl

include ../../../conf/Makefile_so.global
all:
	sudo cp phplikeCppCurl.so /usr/local/lib/node/libphplikeCppCurl.so

nodeCompile:
	node-gyp configure
	node-gyp rebuild

node:
	gmake nodeCompile
	sudo cp build/Release/phplikeCppCurl.dylib /usr/local/lib/node/libphplikeCppCurl.dylib
	#sudo cp build/Release/obj.target/phplikeCppCurl/phplikeCppCurl.o /usr/local/lib/node/libphplikeCppCurl.so


