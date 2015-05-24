#include "socket.h"
#include <stdio.h>

sockaddr_in getSocketAddr(char *hostname, int port) {
    struct sockaddr_in serv_addr;
    struct hostent *hPtr;
    hPtr = gethostbyname(hostname);
    memcpy((char *)&serv_addr.sin_addr, hPtr->h_addr, hPtr->h_length);
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(port);
    return serv_addr;
}

#ifdef OS_LINUX
    #include "socket_linux.cc"
#endif

#ifdef OS_WIN
    #include "socket_win.cc"
#endif



