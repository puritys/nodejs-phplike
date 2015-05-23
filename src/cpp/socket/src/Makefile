SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/lib   -I/usr/lib
LIBS= -lcurl
#-lcurlpp -I./curlpp/include/
extlib = 
CXXFILE= socket.cc
SO = phplikeCppSocket
NAME=Socket

include ../../../../conf/Makefile_so.global
all:
	sudo cp phplikeCppSocket.so /usr/local/lib/node/libphplikeCppSocket.so




include ../../Makefile_so

