#include <string.h>
#include <stdlib.h>

#ifdef OS_LINUX
    #include <sys/types.h>
    #include <sys/socket.h>
    #include <netdb.h>
    #include <unistd.h>

#endif

#ifdef OS_WIN
    #include <winsock2.h>
    #include <iostream>
    using namespace std;
#endif


void phplikeSocketClose(int sockfd);
int phplikeSocketConnect(char *hostname, int port);
void phplikeSocketSend(int sockfd, char *msg, unsigned int len);
char* phplikeSocketReceive(int sockfd, unsigned int length, unsigned int *resLength);


