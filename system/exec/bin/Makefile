SRC_PATH=$(shell pwd)
CC=g++
CFLAGS= -L/usr/local/lib/node/
LIBS= -lexec
extlib = 
CXXFILE= exec.cc
CXXOUTPUT = exec
include ../../../conf/Makefile_exe.global
#include /home/program/lib/Makefile_so.global

#CWD=C:\\cygwin64\\home\\Jackie\\nodejs-phplike\\system\\exec\\bin

ifneq (, $(CYGWIN_PATH))
M_CYGWIN_PATH=$(CYGWIN_PATH)
else
M_CYGWIN_PATH=C:/cygwin64
endif

CWD=`echo $(M_CYGWIN_PATH)$(shell pwd) | sed  's/\//\\\/g'`


gyp:
	node-gyp configure --CWD=$(CWD)
	node-gyp build
