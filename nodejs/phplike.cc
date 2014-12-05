#include "phplike.h"



Handle<Value> node_usleep(const Arguments& args)
{
    unsigned int microSeconds = args[0]->Uint32Value(); 

#ifdef OS_LINUX
    usleep(microSeconds);
#endif

#ifdef OS_WIN
    unsigned int milliSeconds = microSeconds / 1000;
    Sleep(milliSeconds);
#endif

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
   NODE_SET_METHOD(target, "request", node_curl_request);
   NODE_SET_METHOD(target, "nodeCurlGetHeader", nodeCurlGetHeader);

} 


NODE_MODULE(phplike, init)

