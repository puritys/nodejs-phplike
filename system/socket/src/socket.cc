#include "socket.h"
#include <stdio.h>


int phplikeSocketConnect(char *hostname, int port) {/*{{{*/
    int sockfd = 0;
    struct sockaddr_in serv_addr;
    bzero(&serv_addr, sizeof(sockaddr_in));
    struct hostent *hPtr;

    if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        printf("\n Error : Could not create socket \n");
        return -1;
    } 

    hPtr = gethostbyname(hostname);
    memcpy((char *)&serv_addr.sin_addr, hPtr->h_addr, hPtr->h_length);
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons((u_short)port);
    if (connect(sockfd, (struct sockaddr *) &serv_addr, sizeof(serv_addr)) < 0) {
        printf("\n Error : Could not connect to server \n");
        return -1;
    }
    return sockfd;
}/*}}}*/

void phplikeSocketSend(int sockfd, char *msg) {
    send(sockfd, msg, strlen(msg) + 1, MSG_CONFIRM);
}


char* phplikeSocketReceive(int sockfd) {
    int len = 0, orgLen, readSize = 4;
    char *res = NULL;
    int rc = 0;
    char *buf = new char[readSize];
    while (1) {
        rc = recv(sockfd, buf, readSize , 0); 
        if ( rc == 0 ) {
            return res;
        } else if ( rc == -1 ) {
            return res;
        } else {
            orgLen = len;
            len += rc;
            res = (char*)realloc(res, sizeof(char)* (len + 1));
            strncpy(res + orgLen, buf, rc);
            *(res + len) = '\0';
        }
    } 
    return res;
}
