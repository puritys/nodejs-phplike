#include "../../cpp/xml/src/tinyxml2.h"
using namespace tinyxml2;


class phpXMLDocument : public node::ObjectWrap {
    public:
        static void init(Handle<Object> target);
        static Handle<Value> New(const Arguments &args);
        static Handle<Value> load(const Arguments &args);
        static Handle<Value> loadXML(const Arguments &args);
        static void loadChild(Handle<Object> object, XMLNode* node);
        static Handle<Object> getNodeInfo(XMLNode* node, XMLNode* firstChild);
        static Handle<Object> getTextNodeInfo(XMLNode* node);
        static void setAttributesIntoJs(Handle<Object> obj, XMLNode* node);
        static Handle<Value> parseXML(phpXMLDocument *doc);

        tinyxml2::XMLDocument doc;

};


