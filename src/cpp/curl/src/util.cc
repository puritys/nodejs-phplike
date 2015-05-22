#include "util.h" 

namespace util {
    std::string urlEncode(const std::string &toEncode) {
        std::ostringstream out;
         
        for(std::string::size_type i=0; i < toEncode.length(); ++i) {
            short t = toEncode.at(i);
             
            if(
                t == 45 ||          // hyphen
                (t >= 48 && t <= 57) ||       // 0-9
                (t >= 65 && t <= 90) ||       // A-Z
                t == 95 ||          // underscore
                (t >= 97 && t <= 122) ||  // a-z
                t == 126            // tilde
            ) {
                out << toEncode.at(i);
            } else {
                out << charToHex(toEncode.at(i));
            }
        }
         
        return out.str();
    }
 
    std::string urlDecode(const std::string &toDecode) {
        std::ostringstream out;
         
        for(std::string::size_type i=0; i < toDecode.length(); ++i) {
            if(toDecode.at(i) == '%') {
                std::string str(toDecode.substr(i+1, 2));
                out << hexToChar(str);
                i += 2;
            } else {
                out << toDecode.at(i);
            }
        }
         
        return out.str();
    }
 
    std::string charToHex(unsigned char c) {
        short i = c;
         
        std::stringstream s;
         
        s << "%" << std::setw(2) << std::setfill('0') << std::hex << i;
         
        return s.str();
    }
 
    unsigned char hexToChar(const std::string &str) {
        short c = 0;
         
        if(!str.empty()) {
            std::istringstream in(str);
             
            in >> std::hex >> c;
             
            if(in.fail()) {
                throw std::runtime_error("stream decode failure");
            }
        }
         
        return static_cast<unsigned char>(c);
    }
}
