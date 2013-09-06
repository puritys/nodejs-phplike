SRC_PATH=$(shell pwd)
CC=g++
CFLAGS=  -L/usr/local/lib/node 
LIBS= -lexec
extlib = 
CXXFILE= phplike.cc
SO = phplike
#include /usr/local/devlib/Makefile_exe_nodejs.global
include /home/program/lib/Makefile_so_nodejs.global
all:
	sudo cp  phplike.so ./phplike.node

