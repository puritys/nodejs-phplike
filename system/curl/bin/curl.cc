#include <iostream>
//#include <locale>
#include "../src/phplikeCppCurl.h"


using namespace std;



//void execute_phplike_GET() {
//    phplikeCppCurl *pCurl = new phplikeCppCurl();
//
//    string url;
//    url = "http://www.puritys.me:8080/";
//    url = "http://www.puritys.me/";
//
//
//    string response =  pCurl->phplike_GET(url);
//    cout << "header = " << pCurl->resHeader << endl;
//    cout << "content = " << pCurl->resContent << endl;
//
//
//}

void execute_phplike_request() {
    phplikeCppCurl *pCurl = new phplikeCppCurl();

    string url;
    url = "http://www.puritys.me:8080/";
    url = "http://www.puritys.me/";
    map<string, string> param;
    param.insert(std::pair<string, string>("key", "value"));
    param["user"] = "Joe&#";

    map<string, string> header;


    pCurl->request("get", url, param, header);
    cout << "header = " << pCurl->resHeader << endl;
    cout << "content = " << pCurl->resContent << endl;


}

void execute_phplike_convert_param() {
    phplikeCppCurl *pCurl = new phplikeCppCurl();

    map<string, string> param;
    param.insert(std::pair<string, string>("key", "value"));
    param["user"] = "Joe&#";

    string res = pCurl->convertParamToString(param);
    cout << "paramter = " << res << endl;


}



int main () {
    //locale::global (std::locale ("zh_TW.UTF-8"));
    execute_phplike_request();
    //execute_phplike_convert_param();
}

