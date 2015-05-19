#include "socket.h"
#include <stdio.h>

//http://linux.die.net/man/2/socket
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

void phplikeSocketSend(int sockfd, char *msg, unsigned int len) {
    //printf("send msg = ");for (int i = 0; i< len; i++) {printf("%2X ", msg[i] & 0xFF);}printf("\n");
    send(sockfd, msg, len, 0);
}

//http://linux.die.net/man/2/recv
char* phplikeSocketReceive(int sockfd, unsigned int wantedLength, unsigned int *resLength) {/*{{{*/
    int orgLen = 0, readSize, rc = 1;
    char *res = NULL;

    if (wantedLength >= 100000000) {
        fprintf(stderr, "The length, you want,  of socket receive data was too long\n");
        return res;        
    } else if (wantedLength <= 0) {
        fprintf(stderr, "The length, you want,  of socket receive data was too short\n");
        return res;        
    }


    res = (char*) malloc(sizeof(char) * (wantedLength + 1));
    bzero(res, wantedLength + 1);
    readSize = wantedLength;

    char *buf = new char[readSize];
    bzero(buf, readSize);
    *resLength = 0;

    // Receive all response until the end.
    while (rc > 0) {

        rc = recv(sockfd, buf, readSize, MSG_WAITALL);
        if ( rc == 0 ) {
            return res;
        } else if ( rc == -1 ) {
            return res;
        } else {
            orgLen = *resLength;
            *resLength += rc;
            res = (char*) realloc(res, sizeof(char) * (orgLen + readSize + 1));
            *(res + *resLength) = '\0';
            memcpy(res + orgLen, buf, rc);
            //printf("orgLen = %d rc = %d reslength = %d\n", orgLen, rc, *resLength);
            //printf("buf = ");for (int i = 0; i< rc; i++) {printf("%2X ", buf[i]);}printf("\n");
            //printf("res = ");for (int i = 0; i< *resLength; i++) {printf("%2X ", res[i]);}printf("\n");
            if (rc < readSize) {
                return res;
            } else if (*resLength >= wantedLength) {
                return res;
            }
        }
    }
    free(buf); 
    return res;
}/*}}}*/

void phplikeSocketClose(int sockfd) {
    close(sockfd);
}


