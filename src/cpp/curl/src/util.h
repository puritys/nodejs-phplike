
#include <sstream>
#include <stdexcept>
#include <exception>
#include <iomanip>

namespace util {
    std::string urlEncode(const std::string &toEncode);
    std::string urlDecode(const std::string &toDecode);
    std::string charToHex(unsigned char c);
    unsigned char hexToChar(const std::string &str);
 

}
