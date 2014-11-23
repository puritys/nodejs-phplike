#include <iostream>
#include <locale>
#include "../src/phplikeCppCurl.h"


using namespace std;



void execute_phplike_GET() {
    phplikeCppCurl *pCurl = new phplikeCppCurl();

    string url;
    url = "http://www.puritys.me:8080/";
    url = "http://www.puritys.me/";


    string response =  pCurl->phplike_GET(url);
    cout << "header = " << pCurl->resHeader << endl;
    cout << "content = " << pCurl->resContent << endl;


}

int main () {
    std::locale::global (std::locale ("zh_TW.UTF-8"));
    execute_phplike_GET();

}

