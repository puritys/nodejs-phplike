#include "phplike.h"



NAN_METHOD(node_usleep) {
    NanScope();
#ifdef OS_LINUX
    unsigned int microSeconds = args[0]->Uint32Value(); 
    usleep(microSeconds);
#endif

#ifdef OS_WIN
    unsigned int microSeconds = args[0]->Uint32Value(); 
    unsigned int milliSeconds = microSeconds / 1000;
    Sleep(milliSeconds);
#endif
    NanReturnValue(NanNew<Boolean>(true));
}

NAN_METHOD(node_exec) {
    NanScope();
    String::Utf8Value cmd(args[0]);
    bool showMessage = args[1]->BooleanValue();
    string s = exec(string(*cmd), showMessage);
    NanReturnValue(NanNew<String>(s.c_str()));
}

NAN_METHOD(node_md5) {
    NanScope();
    String::Utf8Value text(args[0]);
    string s = md5(string(*text));
    NanReturnValue(NanNew<String>(s.c_str()));
}



void  init (Handle<Object> target){    
   NanScope();
   NODE_SET_METHOD(target, "usleep", node_usleep);
   NODE_SET_METHOD(target, "exec", node_exec);
   NODE_SET_METHOD(target, "request", node_curl_request);
   NODE_SET_METHOD(target, "nodeCurlGetHeader", nodeCurlGetHeader);
   NODE_SET_METHOD(target, "md5", node_md5);
   NODE_SET_METHOD(target, "nodeSocketConnect", nodeSocketConnect);
   NODE_SET_METHOD(target, "nodeSocketSend", nodeSocketSend);
   NODE_SET_METHOD(target, "nodeSocketReceive", nodeSocketReceive);

   phpXMLDocument::init(target);
} 


NODE_MODULE(phplike, init)

