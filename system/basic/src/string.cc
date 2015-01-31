#include "string_cpp.h"

map<string, string> parse_str (string data) {

    map<string, string> result;
    string splitAmp = "&";

    size_t lastPos = 0;
    size_t pos = 0;
    pos = data.find(splitAmp, pos);

    while (lastPos != data.npos) {
        string aParam = data.substr(lastPos, pos - lastPos);
        size_t posOfEqual = aParam.find("=");
        if (posOfEqual != aParam.npos) {
            string name = aParam.substr(0, posOfEqual);
            string value = aParam.substr(posOfEqual + 1, aParam.length() - posOfEqual -1);
            result.insert(pair<string, string>(name, value));
        }

        if (pos == data.npos) {
            lastPos = data.npos;
        } else {
            lastPos = pos + 1;
        }

        pos = data.find(splitAmp, pos + 1);
 
    }

    return result;
}
