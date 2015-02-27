#include "common.h"
#include "phplikeXml.h"


void phpXMLDocument::init(Handle<Object> target) { 
   HandleScope scope;

   Local<FunctionTemplate> constructor = Local<FunctionTemplate>::New(FunctionTemplate::New(phpXMLDocument::New));
   constructor->InstanceTemplate()->SetInternalFieldCount(1); // for constructors
   constructor->SetClassName(String::NewSymbol("phpXMLDocument"));

   NODE_SET_PROTOTYPE_METHOD(constructor, "load", load);
   NODE_SET_PROTOTYPE_METHOD(constructor, "loadXML", loadXML);


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

    return parseXML(d);
}

Handle<Value> phpXMLDocument::loadXML(const Arguments &args) {
    HandleScope scope;
    String::Utf8Value jsContent(args[0]);
    string content = string (*jsContent);
    phpXMLDocument *d = ObjectWrap::Unwrap<phpXMLDocument>(args.This());
    d->doc.Parse(content.c_str(), content.length());

    return parseXML(d);
}

Handle<Value> phpXMLDocument::parseXML(phpXMLDocument *d) {
    HandleScope scope;
    XMLNode* root = d->doc.RootElement();

    Handle<Object> object = Object::New();
    for (XMLNode* node=root; node; node=node->NextSibling() ) {
        XMLNode* firstChildElement = node->FirstChildElement();
        XMLNode* firstChild = node->FirstChild();


        object = getNodeInfo(root, firstChildElement);

        if (firstChild) {
            loadChild(object, firstChild);
        }
    }
    return object;
}

void phpXMLDocument::loadChild(Handle<Object> object, XMLNode* parentNode) {/*{{{*/
    Handle<Array> arr = Array::New();
    int index = 0;
    for (XMLNode* node=parentNode; node; node=node->NextSibling() ) {

        XMLNode* firstChildElement = node->FirstChildElement();
        XMLNode* firstChild = node->FirstChild();


        XMLElement* isElement = node->ToElement();
        Handle<Object> obj;

        if (isElement) {
            obj = getNodeInfo(node, firstChildElement);
        } else {
            obj = getTextNodeInfo(node);
        }

        arr->Set(index, obj);
        index++;

        if (firstChildElement) {
            loadChild(obj, firstChild);
        }
    }
    object->Set(String::New("childNodes"), arr);

}/*}}}*/

Handle<Object> phpXMLDocument::getNodeInfo(XMLNode* node, XMLNode* firstChild) {/*{{{*/
    Handle<Object> obj = Object::New();
    XMLElement* element = node->ToElement();
    Handle<String> name = String::New(element->Name());
    obj->Set(String::New("name"), name);
    setAttributesIntoJs(obj, node); 
    if (!firstChild) {
        Handle<String> val = String::New(element->GetText());
        obj->Set(String::New("value"), val);
    }
    return obj;
}/*}}}*/

Handle<Object> phpXMLDocument::getTextNodeInfo(XMLNode* node) {/*{{{*/
    Handle<Object> obj = Object::New();
    obj->Set(String::New("name"), String::New("text"));

    string value = node->Value();
    obj->Set(String::New("value"), String::New(value.c_str()));

    return obj;
}/*}}}*/



void phpXMLDocument::setAttributesIntoJs(Handle<Object> obj, XMLNode* node) {/*{{{*/
    Handle<Object> attrObj = Object::New();
    XMLElement* elm = node->ToElement();
    const XMLAttribute* attr = elm->FirstAttribute();

    if (attr) {
        for (; attr; attr = attr->Next()) {
            if (attr) {
                Handle<String> name = String::New(attr->Name());
                Handle<String> value = String::New(attr->Value());
                attrObj->Set(name, value);
            }
        }
        obj->Set(String::New("attributes"), attrObj);
    }
}/*}}}*/




