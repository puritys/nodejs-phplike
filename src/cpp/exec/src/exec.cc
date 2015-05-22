#include "exec.h"
#include <stdio.h>
#include <stdlib.h>


#ifdef OS_LINUX
    #include <unistd.h>
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



#endif

#ifdef OS_WIN
    string exec(string command, bool showMessage) 
    {
         string result = "";
         char   psBuffer[2048];
         FILE   *pPipe;
  
              /* Run DIR so that it writes its output to a pipe. Open this
               * pipe with read text attribute so that we can read it 
               * like a text file. 
               */
  
         if( (pPipe = _popen(command.c_str(), "rt")) == NULL )
            exit( 1 );
  
         /* Read pipe until end of file, or an error occurs. */
  
         while(fgets(psBuffer, 2048, pPipe))
         {
            result += psBuffer;
         }
  
  
         /* Close pipe and print return value of pPipe. */
         if (feof( pPipe))
         {
           _pclose(pPipe);
           //printf( "\nProcess returned %d\n", _pclose( pPipe ) );
         }
         return result;
    }

#endif

