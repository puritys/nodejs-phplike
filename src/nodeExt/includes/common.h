#include <iostream>
#include <v8.h>
#include <node.h>
#include <nan.h>
#include <string>

#ifdef OS_LINUX
    #include <unistd.h>
#endif

#ifdef OS_WIN
    #include <windows.h>
#endif

using namespace std;
using namespace v8; 
using namespace node;

