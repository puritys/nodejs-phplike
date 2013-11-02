SRC_PATH=$(shell pwd)
CC=g++
CFLAGS=   
LIBS= -std=gnu++0x 
extlib = 
CXXFILE= exec.cc
SO = exec
#include ../../../conf/Makefile_exe_nodejs.global
include ../../../conf/Makefile_so.global
all:
	sudo cp  exec.so /usr/local/lib/node/libexec.so

