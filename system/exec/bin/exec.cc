#include <iostream>
#include "../src/exec.h"

int main () {
    string s = exec("ls /bin");
    cout << s << endl;
    s = exec("echo 'aaa'");
    cout << s << endl; 

    s = exec("ls -la");
    cout << s << endl; 


}
