#include <unistd.h>
#include "exec.h"

string exec(string command) 
{
    const int MAX_BUFFER = 2048;
    string res="";
    char buffer[MAX_BUFFER];
    FILE *stream = popen(command.c_str(), "r");
    if (stream){
       while (!feof(stream))
       {
            if (fgets(buffer, MAX_BUFFER, stream) != NULL)
            {
               res += buffer;
            }
       }
       pclose(stream);
    }
    return res;
}

