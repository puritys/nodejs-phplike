
#pragma comment ( lib, "Wininet.lib" )

/*
* curl code http://curl.haxx.se/libcurl/c/libcurl-errors.html
* @param url This shouldn't have any parameter, do not include the character "?", please move to param in Node.js
*/
void phplikeCppCurl::request(string method, string url, map<string, string> param , map<string, string> header) {/*{{{*/

    std::transform(method.begin(), method.end(), method.begin(), ::toupper);

    // clear all variable of object.
    initRequest();
    struct requestInfo rInfo;
    rInfo = parseRequestInfoFromUrl(url);
    string userAgent = "The library of node.js-phplike";

    static LPCSTR accept[] = {_T("*/*"), NULL};

    DWORD dwFlags = INTERNET_FLAG_NO_COOKIES; // INTERNET_FLAG_SECURE: ssl
    string paramStr = "";

    paramStr = convertParamToString(param);

    string headerStr = convertHeaderToString(header);
    int headerLength = headerStr.length();

    if (headerLength > 1024 * 256) {
        char message[100];
        sprintf(message, "Your input header is too long, bigger than 256k, header length is %d", headerLength); 
        throw std::runtime_error(message); 
    }

    char *reqHeader = new char[headerLength];
    strcpy(reqHeader, headerStr.c_str());

    char *postData;
    int postDataLength;

    if ("GET" == method) {
        rInfo.path += "?" + paramStr;
    } else if ("POST" == method) {
        postDataLength = paramStr.length();
        if (postDataLength > (1024*1024*10)) {
            char message[100];
            sprintf(message, "Your input post data is too long, bigger than 10MB,  data length is %d", postDataLength); 
            throw std::runtime_error(message); 
        }


        postData = new char[postDataLength];
        strcpy(postData, paramStr.c_str());
    }

    if (rInfo.isSSL == true) {
        dwFlags |= INTERNET_FLAG_SECURE;
    }

    if (1 == 2) {//debug
        cout << "host = " << rInfo.hostname << endl;
        cout << "ssl = " << rInfo.isSSL << endl;
        cout << "port = " << rInfo.port << endl;
        cout << "path = " << rInfo.path << endl;
        cout << "header = " << reqHeader << endl;
        cout << "param = " << paramStr << endl;


    }


    // for clarity, error-checking has been removed
    HINTERNET hSession = InternetOpen(userAgent.c_str(),
       INTERNET_OPEN_TYPE_PRECONFIG, NULL, NULL, 0);
    HINTERNET hConnect = InternetConnect(hSession, _T(rInfo.hostname.c_str()),
       rInfo.port, NULL, NULL, INTERNET_SERVICE_HTTP, 0, 1); // ssl INTERNET_DEFAULT_HTTPS_PORT
    HINTERNET hRequest = HttpOpenRequest(hConnect, method.c_str(),
       _T(rInfo.path.c_str()), NULL, NULL, accept, dwFlags, 1);

    if ("GET" == method) {
        HttpSendRequest(hRequest, reqHeader, strlen(reqHeader), NULL, NULL);
    } else if ("POST" == method) {
        HttpSendRequest(hRequest, reqHeader, strlen(reqHeader), postData, strlen(postData));   
    } else {
        throw std::runtime_error("Sorry! Now, phplike http client only support GET and POST in windows."); 
    }


    // Get Response
    CHAR szBuffer[1025];
    DWORD dwRead=0;
    while(::InternetReadFile(hRequest, szBuffer, sizeof(szBuffer)-1, &dwRead) && dwRead) {

        szBuffer[dwRead] = 0;
        OutputDebugStringA(szBuffer);
        resContent += szBuffer;
        dwRead=0;
    }

    // Get Response Header
    // http://msdn.microsoft.com/en-us/library/windows/desktop/aa385351(v=vs.85).aspx#HTTP_QUERY_RAW_HEADERS
    int statusCode = 0;
    char statusCodeText[70];
    DWORD statusCodeTextLength = sizeof(statusCodeText);
    if(!HttpQueryInfo(hRequest, HTTP_QUERY_STATUS_CODE, &statusCodeText, &statusCodeTextLength, NULL)) {
       // get header fail
    } else {
        statusCode = atoi(statusCodeText);   
    }

    char headerText[70000];
    DWORD headerTextLength = sizeof(headerText);
    if(!HttpQueryInfo(hRequest, HTTP_QUERY_RAW_HEADERS_CRLF, &headerText, &headerTextLength, NULL)) {
       // get header fail
    } else {
        resHeader = headerText;
    }

    ::InternetCloseHandle(hRequest);
    ::InternetCloseHandle(hSession);
    ::InternetCloseHandle(hConnect);
}/*}}}*/


