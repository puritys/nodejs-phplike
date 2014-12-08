#include "common.h"
#include "../system/curl/src/phplikeCppCurl.h"

string resHeader;

Handle<Value> node_curl_request(const Arguments& args) {
    int i, n, curlType = 0;
    phplikeCppCurl *pCurl = new phplikeCppCurl();
    String::Utf8Value method(args[0]); 
    String::Utf8Value url(args[1]);
    Handle<Object> jsParam;
    Handle<Object> jsHeader;

    string paramStr;
    map<string, string> param;
    map<string, string> header;
 
    if (args[2]->IsObject()) {
        jsParam = Handle<Object>::Cast(args[2]);
        Handle<Array> propertyNames = jsParam->GetPropertyNames();
        n = propertyNames->Length();
        for (i = 0; i < n ; i++) {
            Handle<Value>  b = propertyNames->Get(Integer::New(i));
            string c = string(*String::Utf8Value(b));
            Handle<Value>  v = jsParam->Get(b);
            param[c] = string(*String::Utf8Value(v));
        }
    } else if (args[2]->IsString()) {
        paramStr = string(*String::Utf8Value(args[2]));
        curlType = 1;
    }

    if (args[3]->IsObject()) {
        jsHeader = Handle<Object>::Cast(args[3]);
        Handle<Array> propertyNames = jsHeader->GetPropertyNames();
        n = propertyNames->Length();
        for (i = 0; i < n ; i++) {
            Handle<Value>  b = propertyNames->Get(Integer::New(i));
            string c = string(*String::Utf8Value(b));
            Handle<Value>  v = jsHeader->Get(b);
            header[c] = string(*String::Utf8Value(v));
        }

    }

    if (curlType == 1) {
        pCurl->request(string(*method), string(*url), paramStr, header);
    } else {
        pCurl->request(string(*method), string(*url), param, header);
    }
    string content = pCurl->resContent;
    resHeader = pCurl->resHeader;
    return  String::New(content.c_str());
}


Handle<Value> nodeCurlGetHeader(const Arguments& args) {
    return String::New(resHeader.c_str());
}


