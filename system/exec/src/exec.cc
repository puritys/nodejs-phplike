#include <unistd.h>
#include "exec.h"

string exec(string command, bool showMessage) 
{
    const int MAX_BUFFER = 2048;
    string res="";
    char buffer[MAX_BUFFER];
    FILE *stream = popen(command.c_str(), "r");
    if (stream) {
       while (!feof(stream))
       {
            if (fgets(buffer, MAX_BUFFER, stream) != NULL)
            {
                if (showMessage == true) {
                    printf("%s", buffer);
                } 
                res += buffer;
            }
       }
       pclose(stream);
    }
    return res;
}

