#include <iostream>
#include <stdlib.h>
#include "../src/socket.h"
using namespace std;

int main() {
    int sockfd;
    char sysHost[255] = "localhost"; 
    sockfd = phplikeSocketConnect(sysHost, 3307);
    if (sockfd < 0) {
        close(sockfd);
        return 1;
    }

    //send message
    char msg[20] = "aaaaaab";
    phplikeSocketSend(sockfd, msg);

    //receive messagie
    char *buf;
    buf = phplikeSocketReceive(sockfd);
    cout << "response = " << buf <<endl;
    phplikeSocketClose(sockfd);
    free(buf);
    return 1;
}
