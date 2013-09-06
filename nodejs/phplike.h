#include <iostream>
#include "v8.h"
#include "node.h"
#include <unistd.h>
#include "../system/exec/src/exec.h"

using namespace std;
using namespace v8; 
using namespace node;

Handle<Value> node_usleep(const Arguments& args);
Handle<Value> node_exec(const Arguments& args);
