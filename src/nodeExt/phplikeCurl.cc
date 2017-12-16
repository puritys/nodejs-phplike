#include "common.h"
#include "../cpp/curl/src/phplikeCppCurl.h"
#include "node_buffer.h"

string resHeader;


//Handle<Value> node_curl_request(Handle<Object> info) {
NAN_METHOD(node_curl_request) {
    int i, n, curlType = 0;
    Nan::HandleScope scope;
    phplikeCppCurl *pCurl = new phplikeCppCurl();
    String::Utf8Value method(info[0]);
    String::Utf8Value url(info[1]);
    Handle<Object> jsParam;
    Handle<Object> jsHeader;
    Handle<Object> jsOptions;
    Handle<Object> jsFileUpload;

    string paramStr;
    map<string, string> param;
    map<string, string> header;
    map<string, string> options;
    map<string, vector<string> > fileUpload;


    Handle<Array> propertyNames;

    // Handle parameter 
    if (info[2]->IsObject()) {
        jsParam = Handle<Object>::Cast(info[2]);
        propertyNames = jsParam->GetPropertyNames();
        n = propertyNames->Length();
        for (i = 0; i < n ; i++) {
            Handle<Value>  b = propertyNames->Get(Nan::New<Integer>(i));
            string c = string(*String::Utf8Value(b));
            Handle<Value>  v = jsParam->Get(b);
            param[c] = string(*String::Utf8Value(v));
        }
    } else if (info[2]->IsString()) {
        paramStr = string(*String::Utf8Value(info[2]));
        curlType = 1;
    }

    // Handle header
    if (info[3]->IsObject()) {
        jsHeader = Handle<Object>::Cast(info[3]);
        propertyNames = jsHeader->GetPropertyNames();
        n = propertyNames->Length();
        for (i = 0; i < n ; i++) {
            Handle<Value>  b = propertyNames->Get(Nan::New<Integer>(i));
            string c = string(*String::Utf8Value(b));
            Handle<Value>  v = jsHeader->Get(b);
            header[c] = string(*String::Utf8Value(v));
        }

    }

    // Handle options
    if (info[4]->IsObject()) {
        jsOptions = Handle<Object>::Cast(info[4]);
        propertyNames = jsOptions->GetPropertyNames();
        n = propertyNames->Length();
        for (i = 0; i < n ; i++) {
            Handle<Value>  b = propertyNames->Get(Nan::New<Integer>(i));
            string c = string(*String::Utf8Value(b));
            Handle<Value>  v = jsOptions->Get(b);
            options[c] = string(*String::Utf8Value(v));
        }
        if ("true" == options["printLog"]) {
            pCurl->printLog = true;
        }
    }

    // Handle fileUpload
    if (info[5]->IsObject()) {
        jsFileUpload = Handle<Object>::Cast(info[5]);
        propertyNames = jsFileUpload->GetPropertyNames();
        n = propertyNames->Length();
 
        for (i = 0; i < n ; i++) {
            vector<string> fileInfo;
            //Handle<Value>  jsFileInfo = propertyNames->Get(Nan::New<Integer>(i));
            Handle<Value>  b = propertyNames->Get(Nan::New<Integer>(i));
            string c = string(*String::Utf8Value(b));

            Handle<Array>  v = Handle<Array>::Cast(jsFileUpload->Get(b));

            // handle file array
            Handle<Value> fileName = v->Get(Nan::New<Integer>(0));
            Handle<Value> filePath = v->Get(Nan::New<Integer>(1));
            fileInfo.push_back(string(*String::Utf8Value(fileName)));
            fileInfo.push_back(string(*String::Utf8Value(filePath)));

            fileUpload[c] = fileInfo;
        }

    }


    if (curlType == 1) {
        pCurl->request(string(*method), string(*url), paramStr, header, options, fileUpload);
    } else {
        pCurl->request(string(*method), string(*url), param, header, options, fileUpload);
    }

    //string content = pCurl->resContent;

    resHeader = pCurl->resHeader;
    if (pCurl->contentLength <= 0) {
        //NanReturnValue(Nan::New<String>(""));
        info.GetReturnValue().Set(Nan::New<String>("").ToLocalChecked());
    }

    // save binary data into js string.
//    if (
//        //jsOptions->Has(Nan::New<String>("BINARY_RESPONSE"))
//        //&& string(*String::Utf8Value(jsOptions->Get(Nan::New<String>("BINARY_RESPONSE")))) == "1"
//        Nan::Has(jsOptions, Nan::New<String>("BINARY_RESPONSE").ToLocalChecked()) 
//        && *Nan::Utf8String(Nan::Get(jsOptions, Nan::New<String>("BINARY_RESPONSE").ToLocalChecked()).ToLocalChecked()) == "1"
//       ) {
//        //NanReturnValue(Nan::NewBufferHandle(pCurl->resContentPointer, pCurl->contentLength));
//        info.GetReturnValue().Set(Nan::NewBuffer(pCurl->resContentPointer, pCurl->contentLength).ToLocalChecked());
//    }

    //NanReturnValue(Nan::New<String>(pCurl->resContentPointer, pCurl->contentLength));
    info.GetReturnValue().Set(Nan::New<String>(pCurl->resContentPointer, pCurl->contentLength).ToLocalChecked());
}


//Handle<Value> nodeCurlGetHeader(Handle<Object> info) {
NAN_METHOD(nodeCurlGetHeader) {
    Nan::HandleScope scope;
    //NanReturnValue(Nan::New<String>(resHeader.c_str()));
    info.GetReturnValue().Set(Nan::New<String>(resHeader.c_str()).ToLocalChecked());
}


