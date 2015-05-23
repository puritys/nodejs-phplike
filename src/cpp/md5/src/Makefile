SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/lib   -I/usr/lib
LIBS=
#-lcurlpp -I./curlpp/include/
extlib = 
CXXFILE= md5.cc
SO = phplikeCppMd5

NAME=Md5

include ../../../../conf/Makefile_so.global
all:
	sudo cp phplikeCppMd5.so /usr/local/lib/node/libphplikeCppMd5.so


include ../../Makefile_so

