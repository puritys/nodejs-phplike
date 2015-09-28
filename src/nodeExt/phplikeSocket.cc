#include "common.h"
#include "phplikeSocket.h"
#include "node_buffer.h"

NAN_METHOD(nodeSocketConnect) {
    //NanScope();
    Nan::HandleScope scope;
    String::Utf8Value hostname(info[0]);
    int len;
    unsigned int port = info[1]->Uint32Value();
    int sockfd;
    len = hostname.length();
    char *cHostname = (char*)malloc(sizeof(char) * (len + 1));
    strncpy(cHostname, string(*hostname).c_str(), len);
    cHostname[len] = '\0';
    sockfd = phplikeSocketConnect(cHostname, port);
    free(cHostname);
    //NanReturnValue(Nan::New<Integer>(sockfd));
    info.GetReturnValue().Set(Nan::New<Integer>(sockfd));
}

NAN_METHOD(nodeSocketSend) {
    //NanScope();
    Nan::HandleScope scope;
    unsigned int len = info[2]->Uint32Value();
    unsigned int sockfd = info[0]->Uint32Value();
    //char *msg = static_cast<char*>(External::Unwrap(info[1]));
//    void* msg = v8::External::Cast(*info[1].Data())->Value(); 
    Local<Object> bufferObj = info[1]->ToObject();
    char* msg = Buffer::Data(bufferObj);
    //printf("send msg = ");for (int i = 0; i< len; i++) {printf("%2X ", msg[i]&0xFF);}printf("\n");
    phplikeSocketSend(sockfd, msg, len);

    free(msg);
    //NanReturnValue(Nan::New<Integer>(1));
    info.GetReturnValue().Set(Nan::New<Integer>(1));

}

//Handle<Value> nodeSocketReceive(const Arguments &info) {
NAN_METHOD(nodeSocketReceive) {
    //NanScope();
    Nan::HandleScope scope;
    unsigned int sockfd = info[0]->Uint32Value();
    unsigned int length = info[1]->Uint32Value();
    bool isBinary = info[2]->BooleanValue();

    unsigned int resLength = 0;
    char *buf;
    buf = phplikeSocketReceive(sockfd, length, &resLength);

    // save binary data into js string.
    if (isBinary) {
        //node::Buffer *buffer = node::Buffer::New(resLength);
        //memcpy(node::Buffer::Data(buffer), buf, resLength);
        //return buffer->handle_;
        //NanReturnValue(Nan::NewBufferHandle(buf, resLength));
        info.GetReturnValue().Set(Nan::NewBuffer(buf, resLength).ToLocalChecked());
    }

    //NanReturnValue(Nan::New<String>(buf, resLength));
    info.GetReturnValue().Set(Nan::New<String>(buf, resLength).ToLocalChecked());
}

NAN_METHOD(nodeSocketClose) {
    //NanScope();
    Nan::HandleScope scope;
    unsigned int sockfd = info[0]->Uint32Value();
    phplikeSocketClose(sockfd);
    //NanReturnValue(Nan::New<Boolean>(true));
    info.GetReturnValue().Set(Nan::New<Boolean>(true));
}
