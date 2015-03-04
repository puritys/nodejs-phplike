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

CURLoption phplikeCppCurl::getOption(string option) {/*{{{*/
    if (option == "CURLOPT_COOKIEJAR") {
        return CURLOPT_COOKIEJAR;
    } else if (option == "CURLOPT_FILE") {
        return CURLOPT_FILE;
    } else if (option == "CURLOPT_PORT") {
        return CURLOPT_PORT;
    } else if (option == "CURLOPT_TIMEOUT") {
        return CURLOPT_TIMEOUT;
    } else if (option == "CURLOPT_USERAGENT") {
        return CURLOPT_USERAGENT;
    } else if (option == "CURLOPT_PROXY") {
        return CURLOPT_PROXY;
    } else if (option == "CURLOPT_PROXYPORT") {
        return CURLOPT_PROXYPORT;
    } else if (option == "CURLOPT_HTTPPROXYTUNNEL") {
        return CURLOPT_HTTPPROXYTUNNEL;
    } else if (option == "CURLOPT_SSL_VERIFYHOST") {
        return CURLOPT_SSL_VERIFYHOST;
    } else if (option == "CURLOPT_SSL_VERIFYPEER") {
        return CURLOPT_SSL_VERIFYPEER;
    } else if (option == "CURLOPT_VERBOSE") {
        return CURLOPT_VERBOSE;
    }

    return CURLOPT_VERBOSE; //fixme, set a useless config
}/*}}}*/

struct curl_slist *phplikeCppCurl::convertHeaderToChunk(map<string, string> header) {

    struct curl_slist *headerChunk = NULL;
    string p = "";
    for(map<string, string>::iterator it = header.begin(); it != header.end(); ++it) {
        if (p != "") {
            p += "&";
        }
        p = it->first + ": " + it->second;
        headerChunk = curl_slist_append(headerChunk, p.c_str());

    }


    return headerChunk;
}

void phplikeCppCurl::setOpt(CURL *curl, CURLoption option, string value) {

    CURLcode res = curl_easy_setopt(curl, option, value.c_str());
    if (res != CURLE_OK) {
        cerr << "set option failed. ";
    }
}



/*
* curl code http://curl.haxx.se/libcurl/c/libcurl-errors.html
* @param url This shouldn't have any parameter, do not include the character "?", please move to param in Node.js
*/
void phplikeCppCurl::request(
    string method, 
    string url, string paramStr, 
    map<string, string> header, 
    map<string, string> options, 
    map<string, vector<string> > fileUpload
) {/*{{{*/
    CURLcode res;
    CURL *curl;
    contentLength  = 0;
    initRequest();
    std::transform(method.begin(), method.end(), method.begin(), ::toupper);

    if (curl_global_init(CURL_GLOBAL_ALL) != CURLE_OK) {
       fprintf(stderr, "curl_global_init() failed\n");
       return ;
    }

    int fileUploadSize = fileUpload.size();

    curl = curl_easy_init();
    if (fileUploadSize > 0) {
        struct curl_httppost *formpost=NULL;
        struct curl_httppost *lastptr=NULL;

        map<string, vector<string> >::iterator it;
        for (it = fileUpload.begin(); it != fileUpload.end(); ++it) {
            vector<string> fileInfo = it->second;
            string key = it->first;
            string filePath = fileInfo[1];
            curl_formadd(
                &formpost,
                &lastptr,
                CURLFORM_COPYNAME, key.c_str(),
                CURLFORM_FILE, filePath.c_str(),
                CURLFORM_END);
        }

        map<string, string> paramArray = parse_str(paramStr);
        map<string, string>::iterator it2;
        for (it2 = paramArray.begin(); it2 != paramArray.end(); ++it2) {
            curl_formadd(
                &formpost,
                &lastptr,
                CURLFORM_COPYNAME, it2->first.c_str(),
                CURLFORM_COPYCONTENTS, it2->second.c_str(),
                CURLFORM_END);
        } 

        curl_easy_setopt(curl, CURLOPT_HTTPPOST, formpost);
    } else {
        if ("GET" == method) {
            url += "?" + paramStr;
        } else if ("POST" == method) {
            setOpt(curl, CURLOPT_POST, "1");
            setOpt(curl, CURLOPT_POSTFIELDS, paramStr);
        } else {
            setOpt(curl, CURLOPT_CUSTOMREQUEST, method);
            setOpt(curl, CURLOPT_POSTFIELDS, paramStr);
        }
    }

 

    setOpt(curl, CURLOPT_URL, url);
    setOpt(curl, CURLOPT_HEADER, "1");

    map<string, string>::iterator it;

    for (it = options.begin(); it != options.end(); ++it) {
        size_t curlOptPos = it->first.find("CURLOPT");
        if (curlOptPos != string::npos) {
            CURLoption op = getOption(it->first);
            setOpt(curl, op, it->second);
        }
    }
    //setOpt(curl, CURLOPT_REFERER, "xx");
    //setOpt(curl, CURLOPT_USERAGENT, "1");
    //setOpt(curl, CURLOPT_COOKIE, "1");
    //setOpt(curl, CURLOPT_VERBOSE, "1");
    //curl_easy_setopt(curl, CURLOPT_CONNECT_ONLY, "1");

    // Handle request header.
    struct curl_slist *headerChunk = NULL;
    if (!header.empty()) {
        headerChunk = convertHeaderToChunk(header);
        res = curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headerChunk);
    }


    // Handle response header and content.
    struct string2 resH;
    init_string(&resH);
    res = curl_easy_setopt(curl, CURLOPT_HEADERFUNCTION, recvResponse);
    curl_easy_setopt(curl, CURLOPT_HEADERDATA, &resH);

    struct string2 resC;
    init_string(&resC);
    res = curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, recvResponse);
    res = curl_easy_setopt(curl, CURLOPT_WRITEDATA, &resC);

    res = curl_easy_perform(curl);
    long http_code = 0;
    curl_easy_getinfo (curl, CURLINFO_RESPONSE_CODE, &http_code);

    if (!res) {
        stringstream ss;
        ss << http_code;
        resHeader = ss.str() + "\r\n";
        resHeader += resH.ptr;
        resContent = resC.ptr;
        size_t foundPos = resContent.find("\r\n\r\n");
        if (fileUploadSize > 0) {
            foundPos = resContent.find("\r\n\r\n", foundPos + 1);
        }
        //if (foundPos != std::string::npos) {
        //    resContent.replace(0, foundPos + 4, "");
        //}
        size_t contentStartPosition = foundPos + 4;
        contentLength = resC.len - contentStartPosition;
        resContentPointer = resC.ptr + contentStartPosition;
    }

    if (!header.empty()) {
        curl_slist_free_all(headerChunk);
    }

    curl_easy_cleanup(curl);
    curl_global_cleanup();


}/*}}}*/


