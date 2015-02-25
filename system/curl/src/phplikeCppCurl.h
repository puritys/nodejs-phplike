#include <stdlib.h>
#include <stdio.h>
#include <string> 
#include <iostream>
#include <map>
#include <vector>
#include <memory.h>
#include "../../basic/src/string_cpp.h"

#ifdef OS_MAC
    #include <malloc/malloc.h>
    #include <curl/curl.h>
#elif OS_LINUX
    #include <malloc.h>
    #include <curl/curl.h>
#endif

#ifdef OS_WIN
    #include <windows.h>
    #include <tchar.h>
    #include <wininet.h>
#endif

#define REQ_HEADER_MAX_LENGTH 3000;

using namespace std;


size_t recvResponse(void *ptr, size_t size, size_t nmemb, struct string2 *s);

struct requestInfo {
    bool isSSL;
    int port;
    string hostname;
    string path;
    string param; 
};

class phplikeCppCurl {
    public:
        //Property
        char httpVersion[5];
        string resHeader;
        string resContent;

        //Method
        phplikeCppCurl();
        ~phplikeCppCurl();
        void initRequest();
        requestInfo parseRequestInfoFromUrl(string url);
        string phplike_GET(string url);
        void request(string method, string url, map<string, string> param, map<string, string> header, map<string, string> options, map<string, vector<std::string> > fileUpload);
        // The curl function in linux and windows.
        void request(string method, string url, string param, map<string, string> header, map<string, string> options, map<string, vector<std::string> > fileUpload);

        string convertParamToString(map<string, string> param);
        string convertHeaderToString(map<string, string> param);


#ifdef OS_LINUX
        struct curl_slist *convertHeaderToChunk(map<string, string> header);
        CURLoption getOption(string option);
        void setOpt(CURL *curl, CURLoption option, string value);
#endif

};
