#include <iostream>
#include <string>
#include "../src/phplikeCppCurl.h"



using namespace std;



void execute_phplike_request() {
    phplikeCppCurl *pCurl = new phplikeCppCurl();

    string url;
    //url = "http://www.puritys.me:8080/";
    url = "http://www.puritys.me/test.php";
    map<string, string> param;
    param.insert(std::pair<string, string>("key", "value"));
    param["user"] = "Joe&#";

    map<string, string> header;

    header["Referer"] = "http://www.google.com.tw/xxxx";
    header["Cookie"] = "couser=xyz; name=aaa";
    header["Referer2"] = "gsgsegegesghttp://www.google.com.tw/xxxx";

    //int i;
    //for (i = 0 ; i < 1024; i++) {
    //    header["Referer2"] += "a";
    //}


    pCurl->request("get", url, param, header);
    cout << "header = " << pCurl->resHeader << endl;
    cout << "content = " << pCurl->resContent << endl;


}

void execute_phplike_convert_param() {/*{{{*/
    phplikeCppCurl *pCurl = new phplikeCppCurl();

    map<string, string> param;
    param.insert(std::pair<string, string>("key", "value"));
    param["user"] = "Joe&#";

    string res = pCurl->convertParamToString(param);
    cout << "paramter = " << res << endl;


}/*}}}*/

void execute_phplike_getRequestInfoFromUrl() {/*{{{*/
    phplikeCppCurl *pCurl = new phplikeCppCurl();

    struct requestInfo res = pCurl->parseRequestInfoFromUrl("http://www.puritys.me/aaaa?g=r");
    cout << "hostname = " 
         << res.hostname 
         << " isSSL = " << res.isSSL
         << endl
         << " path = " << res.path
         << endl
         << "param = " << res.param
         << endl;


}/*}}}*/



int main () {
    //locale::global (std::locale ("zh_TW.UTF-8"));
    execute_phplike_request();
    //execute_phplike_convert_param();
    //execute_phplike_getRequestInfoFromUrl();
}

