#include "common.h"
#include "phplikeSocket.h"
#include "node_buffer.h"

NAN_METHOD(nodeSocketConnect) {
    NanScope();
    String::Utf8Value hostname(args[0]);
    int len;
    unsigned int port = args[1]->Uint32Value();
    int sockfd;
    len = hostname.length();
    char *cHostname = (char*)malloc(sizeof(char) * (len + 1));
    strncpy(cHostname, string(*hostname).c_str(), len);
    cHostname[len] = '\0';
    sockfd = phplikeSocketConnect(cHostname, port);
    free(cHostname);
    NanReturnValue(NanNew<Integer>(sockfd));

}

NAN_METHOD(nodeSocketSend) {
    NanScope();
    unsigned int len = args[2]->Uint32Value();
    unsigned int sockfd = args[0]->Uint32Value();
    //char *msg = static_cast<char*>(External::Unwrap(args[1]));
//    void* msg = v8::External::Cast(*args[1].Data())->Value(); 
    Local<Object> bufferObj = args[1]->ToObject();
    char* msg = Buffer::Data(bufferObj);
//    Handle<Value> msg = NanNew<String>(args[1]->ToString(), static_cast<int>(len));
//    char *cMsg = (char*)malloc(sizeof(char) * (len + 1));
    //memcpy(cMsg, string(*msg).c_str(), len);
    //memcpy(cMsg, msg, len);
    //cMsg[len] = '\0';
    //printf("send msg = ");for (int i = 0; i< len; i++) {printf("%2X ", msg[i]&0xFF);}printf("\n");
    phplikeSocketSend(sockfd, msg, len);

//    free(cMsg);
    NanReturnValue(NanNew<Integer>(1));


}

//Handle<Value> nodeSocketReceive(const Arguments &args) {
NAN_METHOD(nodeSocketReceive) {
    NanScope();
    unsigned int sockfd = args[0]->Uint32Value();
    unsigned int length = args[1]->Uint32Value();
    bool isBinary = args[2]->BooleanValue();

    unsigned int resLength = 0;
    char *buf;
    buf = phplikeSocketReceive(sockfd, length, &resLength);

    // save binary data into js string.
    if (isBinary) {
        //node::Buffer *buffer = node::Buffer::New(resLength);
        //memcpy(node::Buffer::Data(buffer), buf, resLength);
        //return buffer->handle_;
        NanReturnValue(NanNewBufferHandle(buf, resLength));

    }

    NanReturnValue(NanNew<String>(buf, resLength));

}

