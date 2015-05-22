#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <unistd.h>
#include <stdlib.h>


int phplikeSocketConnect(char *hostname, int port);
void phplikeSocketSend(int sockfd, char *msg, unsigned int len);
char* phplikeSocketReceive(int sockfd, unsigned int length, unsigned int *resLength);
void phplikeSocketClose(int sockfd);


