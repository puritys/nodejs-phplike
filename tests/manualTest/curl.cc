/*
 * g++ curl.cc -lcurl -o curl.out
 */

#include <iostream>
#include <stdlib.h>
#include <stdio.h>
#include <string>
#include <iostream>
#include <map>
#include <vector>
#include <memory.h>
#include <malloc.h>
#include <curl/curl.h>
#include <sstream>
#include <algorithm>
using namespace std;

struct string2 {
  char *ptr;
  size_t len;
};

void init_string(struct string2 *s) {
  s->len = 0;
  s->ptr = (char *)malloc(s->len+1);
  if (s->ptr == NULL) {
    fprintf(stderr, "malloc() failed\n");
    exit(EXIT_FAILURE);
  }
  s->ptr[0] = '\0';
}

size_t recvResponse(void *ptr, size_t size, size_t nmemb, struct string2 *s )  {
  size_t new_len = s->len + size*nmemb;
  s->ptr = (char *)realloc(s->ptr, new_len+1);
  if (s->ptr == NULL) {
    fprintf(stderr, "realloc() failed\n");
    exit(EXIT_FAILURE);
  }
  memcpy(s->ptr+s->len, ptr, size*nmemb);
  s->ptr[new_len] = '\0';
  s->len = new_len;

  return size*nmemb;


}

CURLcode setBasicCurl(CURL *curl, string method, string2 *resH, string2 *resC) {/*{{{*/
    CURLcode res;
    std::transform(method.begin(), method.end(), method.begin(), ::toupper);
    curl_easy_setopt(curl, CURLOPT_HEADER, 1L);
    curl_easy_setopt(curl, CURLOPT_VERBOSE, 1L);

    init_string(resH);
    res = curl_easy_setopt(curl, CURLOPT_HEADERFUNCTION, recvResponse);
    curl_easy_setopt(curl, CURLOPT_HEADERDATA, resH);

    init_string(resC);
    res = curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, recvResponse);
    res = curl_easy_setopt(curl, CURLOPT_WRITEDATA, resC);

}/*}}}*/

string handleResponse(CURL *curl, CURLcode res, string2 resH, string2 resC) {/*{{{*/
    size_t contentLength  = 0;
    size_t contentStartPosition = 0;
    char *resContentPointer;
    string resHeader = "";
    string resContent = "";
    string headerTmp = "";
    if (!res) {
        long http_code = 0;
        curl_easy_getinfo (curl, CURLINFO_RESPONSE_CODE, &http_code);

        stringstream ss;
        ss << http_code;
        resHeader = ss.str() + "\r\n";
        resHeader += resH.ptr;
        resContent = resC.ptr;
        do {
            // filter header and get the position of response body.
            size_t foundPos = resContent.find("\r\n\r\n");
            if (foundPos > 25) {
                //headerStatusLineSize 25
                headerTmp = resContent.substr(0, 25);
            } else {
                headerTmp = resContent.substr(0, foundPos);
            }

            if (headerTmp.find("100 Continue") != std::string::npos) {
                resContent = resC.ptr + foundPos + 4;
                contentStartPosition += foundPos + 4;
            } else {
                contentStartPosition += foundPos + 4;
                break;
            }
        } while(1);

        contentLength = resC.len - contentStartPosition;
        resContentPointer = resC.ptr + contentStartPosition;
    }
    return resContent;

}/*}}}*/

void req1() {
    CURL *curl;
    curl = curl_easy_init();
    struct string2 resH;
    struct string2 resC;
    string method = "GET";
    CURLcode res = setBasicCurl(curl, method, &resH, &resC);
    string url = "https://www.google.com.tw/";
    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());

    res = curl_easy_perform(curl);
    string resp = handleResponse(curl, res, resH, resC);
    //cout << "response = " << resp;
    curl_easy_cleanup(curl);

}


int main(int argc, const char *argv[])
{
    if (curl_global_init(CURL_GLOBAL_ALL) != CURLE_OK) {
       fprintf(stderr, "curl_global_init() failed\n");
       return 0;
    }
    req1();
    curl_global_cleanup();
    return 0;
}

