#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <unistd.h>
#include <stdlib.h>

#ifndef MSG_CONFIRM
#define MSG_CONFIRM 0x800
#endif

int phplikeSocketConnect(char *hostname, int port);
void phplikeSocketSend(int sockfd, char *msg, unsigned int len);
char* phplikeSocketReceive(int sockfd, unsigned int length, unsigned int *resLength);
void phplikeSocketClose(int sockfd);


