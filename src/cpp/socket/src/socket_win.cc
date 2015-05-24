
// http://blog.pusheax.com/2013/07/windows-api-winsock-create-your-first.html
int phplikeSocketConnect(char *hostname, int port) {/*{{{*/
    struct sockaddr_in serv_addr;

    WSAData version;
    WORD mkword = MAKEWORD(2,2);
    int what = WSAStartup(mkword,&version);
    if(what!=0) {
        cout << "This version is not supported! -" << WSAGetLastError();
    } 

    SOCKET u_sock = socket(AF_INET,SOCK_STREAM,IPPROTO_TCP);
    if(u_sock == INVALID_SOCKET) {
        std::cout<<"Creating socket fail\n";
    } 

    serv_addr = getSocketAddr(hostname, port);

    int conn = connect(u_sock, (struct sockaddr *) &serv_addr, sizeof(serv_addr));
    if (conn == SOCKET_ERROR) {
        std::cout<<"Error - when connecting "<<WSAGetLastError()<<std::endl;
        closesocket(u_sock);
        WSACleanup();
    }

    return u_sock;
}/*}}}*/

void phplikeSocketSend(int sockfd, char *msg, unsigned int len) {

    //printf("send msg = ");for (int i = 0; i< len; i++) {printf("%2X ", msg[i] & 0xFF);}printf("\n");
    int smsg=send(sockfd, msg, len, 0);
    if(smsg == SOCKET_ERROR){
        std::cout<<"Error: "<<WSAGetLastError()<<std::endl;
        WSACleanup();
    }

}

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
    memset(res, '\0', wantedLength + 1); 
    readSize = wantedLength;

    char *buf = new char[readSize];
    memset(buf, '\0', readSize); 
    *resLength = 0;

    // Receive all response until the end.
    while (rc > 0) {
        rc = recv(sockfd, buf, readSize, 0);
        if (rc == SOCKET_ERROR) {
          std::cout<<"Error in Receiving: "<<WSAGetLastError()<<std::endl;
        }

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
    closesocket(sockfd);
}


