#include "common.h"
#include "../system/curl/src/phplikeCppCurl.h"

Handle<Value> node_curl_get(const Arguments& args)
{

    phplikeCppCurl *pCurl = new phplikeCppCurl();
    String::Utf8Value url(args[0]);


    pCurl->phplike_GET(string(*url));
    //cout << "header = " << pCurl->resHeader << endl;
    //cout << "content = " << pCurl->resContent << endl;
    string content = pCurl->resContent;
    
    return  String::New(content.c_str());
}

//void  phplikeCurlInit (Handle<Object> target){    
//   NODE_SET_METHOD(target, "requestGet", node_curl_get);
//} 
//
//
//NODE_MODULE(phplikeCurl, phplikeCurlInit);
//
