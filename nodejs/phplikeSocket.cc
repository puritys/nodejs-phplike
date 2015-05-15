#include "common.h"
#include "phplikeSocket.h"

Handle<Value> nodeSocketConnet(const Arguments &args) {
    HandleScope scope;
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
    return Integer::New(sockfd);

}

Handle<Value> nodeSocketSend(const Arguments &args) {
    HandleScope scope;
    String::Utf8Value msg(args[1]);
    int len = msg.length();
    unsigned int sockfd = args[0]->Uint32Value();

    char *cMsg = (char*)malloc(sizeof(char) * (len + 1));
    strncpy(cMsg, string(*msg).c_str(), len);
    cMsg[len] = '\0';
    phplikeSocketSend(sockfd, cMsg);

    free(cMsg);
    return Integer::New(1);


}

Handle<Value> nodeSocketReceive(const Arguments &args) {
    HandleScope scope;
    unsigned int sockfd = args[0]->Uint32Value();
    char *buf;
    buf = phplikeSocketReceive(sockfd);
    
    return String::New(buf);

}

