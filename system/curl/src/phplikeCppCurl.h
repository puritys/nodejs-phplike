#include <stdlib.h>
#include <stdio.h>
#include <string.h> 
#include <iostream>
#include <map>
#include <curl/curl.h>

#define REQ_HEADER_MAX_LENGTH 3000;

using namespace std;


size_t recvResponse(void *ptr, size_t size, size_t nmemb, struct string2 *s);

class phplikeCppCurl {
    public:
        //Property
        char httpVersion[5];
        string resHeader;
        string resContent;

        //Method
        phplikeCppCurl();
        ~phplikeCppCurl();
        string phplike_GET(string url);
        void request(string method, string url, map<string, string> param , map<string, string> header);
        void setOpt(CURL *curl, CURLoption option, string value);
        string convertParamToString(map<string, string> param);
        struct curl_slist *convertHeaderToChunk(map<string, string> header);

};
