#include "common.h"
#include "phplikeXml.h"


void phpXMLDocument::init(Handle<Object> target) { 
   HandleScope scope;

   Local<FunctionTemplate> constructor = Local<FunctionTemplate>::New(FunctionTemplate::New(phpXMLDocument::New));
   constructor->InstanceTemplate()->SetInternalFieldCount(1); // for constructors
   constructor->SetClassName(String::NewSymbol("phpXMLDocument"));

   NODE_SET_PROTOTYPE_METHOD(constructor, "load", load);

   target->Set(String::NewSymbol("DOMDocument"), constructor->GetFunction());

}

Handle<Value> phpXMLDocument::New(const Arguments &args) {
    HandleScope scope;
    phpXMLDocument *d = new phpXMLDocument();
    d->Wrap(args.This());
    return args.This();

}

Handle<Value> phpXMLDocument::load(const Arguments &args) {
    HandleScope scope;
    String::Utf8Value jsFile(args[0]);
    string file = string(*jsFile);
    phpXMLDocument *d = ObjectWrap::Unwrap<phpXMLDocument>(args.This());
    d->doc.LoadFile(file.c_str());
    XMLNode* root = d->doc.RootElement();

    Handle<Object> object = Object::New();
    for (XMLNode* node=root; node; node=node->NextSibling() ) {
        XMLNode* firstChild = node->FirstChildElement();
        Handle<Object> obj = getNodeInfo(node, firstChild);

        if (firstChild) {
            loadChild(object, firstChild);
        }
    }
    return object;
}

void phpXMLDocument::loadChild(Handle<Object> object, XMLNode* parentNode) {
    Handle<Array> arr = Array::New();
    int index = 0;
    for (XMLNode* node=parentNode; node; node=node->NextSibling() ) {

        XMLNode* firstChild = node->FirstChildElement();
        Handle<Object> obj = getNodeInfo(node, firstChild);

        arr->Set(index, obj);
        index++;

        if (firstChild) {
            loadChild(obj, firstChild);
        }
    }
    object->Set(String::New("children"), arr);

}

Handle<Object> phpXMLDocument::getNodeInfo(XMLNode* node, XMLNode* firstChild) {
    Handle<Object> obj = Object::New();
    XMLElement* element = node->ToElement();
    Handle<String> key = String::New(element->Name());
    obj->Set(String::New("key"), key);

    if (!firstChild) {
        Handle<String> val = String::New(element->GetText());
        obj->Set(String::New("value"), val);
    }
    return obj;
}
