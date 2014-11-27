#include <iostream>
#include "../src/exec.h"
#include <string>
using namespace std;

int main () {
    printf("test");
    string s = exec("ls /bin");

    cout << s << endl;
    s = exec("echo 'aaa'");
    cout << s << endl; 

    s = exec("ls -la");
    cout << s << endl; 

    return 1;
}
