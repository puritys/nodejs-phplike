#include <iostream>
#include <sstream>
#include <algorithm>

#include "phplikeCppCurl.h"
#include "util.h"



phplikeCppCurl::phplikeCppCurl() {
    sprintf(httpVersion, "1.1");
}


phplikeCppCurl::~phplikeCppCurl() {

}


void phplikeCppCurl::initRequest() {
    resContent = "";
    resHeader = "";
}

/**
* Get hostname, port, ssl, param information from url.
* @return A structure which include the path, parameter, port, host information
*/
struct requestInfo phplikeCppCurl::parseRequestInfoFromUrl(string url) {/*{{{*/

    struct requestInfo rInfo;
    size_t pos;
    string protocol;
    rInfo.param = "";
    pos = url.find("://");
    if (pos == std::string::npos) {
         throw std::runtime_error("Your input url is wrong, missing http://");
    }
    protocol = url.substr(0, pos);
    std::transform(protocol.begin(), protocol.end(), protocol.begin(), ::toupper);
    if ("HTTPS" == protocol) {
        rInfo.isSSL = true;
        rInfo.port = 443;
    } else {
        rInfo.isSSL = false;
        rInfo.port = 80;
    }

    url = url.substr(pos + 3, url.length() - pos - 3);

    pos = url.find("/");
    if (pos == std::string::npos) {
        rInfo.path = "/";
        rInfo.hostname = url;
        return rInfo;
    } else {
        rInfo.hostname = url.substr(0, pos);
        url = url.substr(pos, url.length() - pos);
    }

    pos = rInfo.hostname.find(":");
    if (pos != std::string::npos) {
        rInfo.port = atoi(rInfo.hostname.substr(pos + 1, rInfo.hostname.length() - pos).c_str());
        rInfo.hostname = rInfo.hostname.substr(0, pos);
    }

    pos = url.find("?");
    if (pos == std::string::npos) {
        rInfo.path = url;
        return rInfo;
    } else {
        rInfo.path = url.substr(0, pos);
        rInfo.param = url.substr(pos + 1, url.length() - pos);
    }

    return rInfo;
}/*}}}*/

/*
Convert the multi key and value to one string. It can be used in HTTP POST method. 
Return key=value&keu=value2
*/
string phplikeCppCurl::convertParamToString(map<string, string> param) {/*{{{*/
    string p = "";

    for(map<string, string>::iterator it = param.begin(); it != param.end(); ++it) {
        if (p != "") {
            p += "&";
        }
        p += it->first + "=" + util::urlEncode(it->second);

    }

    return p;
};/*}}}*/



/**
 * 
 */
string phplikeCppCurl::convertHeaderToString(map<string, string> headers) {/*{{{*/
    string p = "";

    for(map<string, string>::iterator it = headers.begin(); it != headers.end(); ++it) {
        if (p != "") {
            p += "\r\n";
        }
        p += it->first + ": " + it->second;

    }

    return p;
};/*}}}*/

/**
 * Method of curl request, the parameters include header and options of curl.
 */
void phplikeCppCurl::request(string method, string url, 
                             map<string, string> param, 
                             map<string, string> header,
                             map<string, string> options
                            ) {/*{{{*/

    string paramStr = "";
    paramStr = convertParamToString(param);
    request(method, url, paramStr, header, options);

}/*}}}*/

///**
// * Method of curl request
// */
//void phplikeCppCurl::request(string method, string url, map<string, string> param , map<string, string> header, map<string, string> options) {/*{{{*/
//
//    string paramStr = "";
//    paramStr = convertParamToString(param);
//    request(method, url, paramStr, header, options);
//
//}/*}}}*/
//



#ifdef OS_LINUX
    #include "phplikeCppCurl_linux.cc"
#endif

#ifdef OS_WIN
    #include "phplikeCppCurl_win.cc"
#endif

