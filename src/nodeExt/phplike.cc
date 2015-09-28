#include "phplike.h"



NAN_METHOD(node_usleep) {
//    NanScope();
    Nan::HandleScope scope;
#ifdef OS_LINUX
    unsigned int microSeconds = info[0]->Uint32Value(); 
    usleep(microSeconds);
#endif

#ifdef OS_WIN
    unsigned int microSeconds = info[0]->Uint32Value(); 
    unsigned int milliSeconds = microSeconds / 1000;
    Sleep(milliSeconds);
#endif
    //NanReturnValue(NanNew<Boolean>(true));
    info.GetReturnValue().Set(Nan::New<Boolean>(true));
}

NAN_METHOD(node_exec) {
//    NanScope();
    Nan::HandleScope scope;
    String::Utf8Value cmd(info[0]);
    bool showMessage = info[1]->BooleanValue();
    string s = exec(string(*cmd), showMessage);
    //NanReturnValue(Nan::New<String>(s.c_str()));
    info.GetReturnValue().Set(Nan::New<String>(s.c_str()).ToLocalChecked());
}

NAN_METHOD(node_md5) {
//    NanScope();
    Nan::HandleScope scope;
    String::Utf8Value text(info[0]);
    string s = md5(string(*text));
    //NanReturnValue(Nan::New<String>(s.c_str()));
    info.GetReturnValue().Set(Nan::New<String>(s.c_str()).ToLocalChecked());
}



void  init (Handle<Object> target){    
//   NanScope();
   Nan::HandleScope scope;

   Nan::SetMethod(target, "usleep", node_usleep);
   Nan::SetMethod(target, "exec", node_exec);
   Nan::SetMethod(target, "request", node_curl_request);
   Nan::SetMethod(target, "nodeCurlGetHeader", nodeCurlGetHeader);
   Nan::SetMethod(target, "md5", node_md5);
   Nan::SetMethod(target, "nodeSocketConnect", nodeSocketConnect);
   Nan::SetMethod(target, "nodeSocketSend", nodeSocketSend);
   Nan::SetMethod(target, "nodeSocketReceive", nodeSocketReceive);
   Nan::SetMethod(target, "nodeSocketClose", nodeSocketClose);


   phpXMLDocument::init(target);
} 


NODE_MODULE(phplike, init)

