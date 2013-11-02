#include "phplike.h"

Handle<Value> node_usleep(const Arguments& args)
{
    unsigned int seconds = args[0]->Uint32Value(); 
    usleep(seconds);
    return True();
}

Handle<Value> node_exec(const Arguments& args)
{
    String::Utf8Value cmd(args[0]);
    bool showMessage = args[1]->BooleanValue();
    string s = exec(string(*cmd), showMessage);
    return String::New(s.c_str());
}

void  init (Handle<Object> target){    
   NODE_SET_METHOD(target, "usleep", node_usleep);
   NODE_SET_METHOD(target, "exec", node_exec);
} 


NODE_MODULE(phplike, init)

