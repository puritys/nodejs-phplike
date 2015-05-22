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

Handle<Value> node_md5(const Arguments& args)
{
    String::Utf8Value text(args[0]);
    string s = md5(string(*text));
    return String::New(s.c_str());
}



void  init (Handle<Object> target){    

   HandleScope scope;
   NODE_SET_METHOD(target, "usleep", node_usleep);
   NODE_SET_METHOD(target, "exec", node_exec);
   NODE_SET_METHOD(target, "request", node_curl_request);
   NODE_SET_METHOD(target, "nodeCurlGetHeader", nodeCurlGetHeader);
   NODE_SET_METHOD(target, "md5", node_md5);
   NODE_SET_METHOD(target, "nodeSocketConnet", nodeSocketConnet);
   NODE_SET_METHOD(target, "nodeSocketSend", nodeSocketSend);
   NODE_SET_METHOD(target, "nodeSocketReceive", nodeSocketReceive);



   phpXMLDocument::init(target);
} 


NODE_MODULE(phplike, init)

