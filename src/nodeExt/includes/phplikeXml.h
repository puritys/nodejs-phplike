#include "../../cpp/xml/src/tinyxml2.h"
using namespace tinyxml2;


class phpXMLDocument : public node::ObjectWrap {
    public:
        static void init(Handle<Object> target);
        static NAN_METHOD(New);//Handle<Value> New(const Arguments &args);
        static NAN_METHOD(load);//Handle<Value> load(const Arguments &args);
        static NAN_METHOD(loadXML);//Handle<Value> loadXML(const Arguments &args);
        static void loadChild(Local<Object> object, XMLNode* node);
        static Local<Object> getNodeInfo(XMLNode* node, XMLNode* firstChild);
        static Local<Object> getTextNodeInfo(XMLNode* node);
        static void setAttributesIntoJs(Handle<Object> obj, XMLNode* node);
        static Local<Object> parseXML(phpXMLDocument *doc);

        tinyxml2::XMLDocument doc;

};


