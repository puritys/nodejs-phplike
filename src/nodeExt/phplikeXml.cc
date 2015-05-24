#include "common.h"
#include "phplikeXml.h"


void phpXMLDocument::init(Handle<Object> target) { 
//NAN_METHOD(phpXMLDocument::init) {
    NanScope();
//    Local<FunctionTemplate> constructor = Local<FunctionTemplate>::New(FunctionTemplate::New(phpXMLDocument::New));
    Local<FunctionTemplate> constructor = NanNew<FunctionTemplate>(phpXMLDocument::New);
    constructor->InstanceTemplate()->SetInternalFieldCount(1); // for constructors
    constructor->SetClassName(NanNew<String>("phpXMLDocument"));

    NODE_SET_PROTOTYPE_METHOD(constructor, "load", load);
    NODE_SET_PROTOTYPE_METHOD(constructor, "loadXML", loadXML);


    target->Set(NanNew<String>("DOMDocument"), constructor->GetFunction());

}

NAN_METHOD(phpXMLDocument::New) {
    NanScope();
    phpXMLDocument *d = new phpXMLDocument();
    d->Wrap(args.This());
    NanReturnThis();
}

NAN_METHOD(phpXMLDocument::load) {
    //HandleScope scope;
    NanScope();
    String::Utf8Value jsFile(args[0]);
    string file = string(*jsFile);
    phpXMLDocument *d = ObjectWrap::Unwrap<phpXMLDocument>(args.This());
    d->doc.LoadFile(file.c_str());

    NanReturnValue(parseXML(d));
}

NAN_METHOD(phpXMLDocument::loadXML) {
    NanScope();
    String::Utf8Value jsContent(args[0]);
    string content = string (*jsContent);
    phpXMLDocument *d = ObjectWrap::Unwrap<phpXMLDocument>(args.This());
    d->doc.Parse(content.c_str(), content.length());

    NanReturnValue(parseXML(d));
}

Handle<Object> phpXMLDocument::parseXML(phpXMLDocument *d) {
    XMLNode* root = d->doc.RootElement();

    Handle<Object> object = NanNew<Object>();
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
    Handle<Array> arr = NanNew<Array>();//Array::New();
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
    object->Set(NanNew<String>("childNodes"), arr);

}/*}}}*/


void phpXMLDocument::setAttributesIntoJs(Handle<Object> obj, XMLNode* node) {/*{{{*/
    Handle<Object> attrObj = NanNew<Object>();//Object::New();
    XMLElement* elm = node->ToElement();
    const XMLAttribute* attr = elm->FirstAttribute();

    if (attr) {
        for (; attr; attr = attr->Next()) {
            if (attr) {
                Handle<String> name = NanNew<String>(attr->Name());
                Handle<String> value = NanNew<String>(attr->Value());
                attrObj->Set(name, value);
            }
        }
    }

    obj->Set(NanNew<String>("attributes"), attrObj);

}/*}}}*/


Handle<Object> phpXMLDocument::getNodeInfo(XMLNode* node, XMLNode* firstChildElement) {/*{{{*/

    Handle<Object> obj = NanNew<Object>();
    XMLElement* element = node->ToElement();
    Handle<String> name = NanNew<String>(element->Name());
    obj->Set(NanNew<String>("name"), name);
    setAttributesIntoJs(obj, node); 
    if (!firstChildElement && node->FirstChild()) {
        Handle<String> val = NanNew<String>(element->GetText());
        obj->Set(NanNew<String>("value"), val);
    } else {
        Handle<String> val = NanNew<String>("");
        obj->Set(NanNew<String>("value"), val);
    }
    return obj;
}/*}}}*/

Handle<Object> phpXMLDocument::getTextNodeInfo(XMLNode* node) {/*{{{*/
    Handle<Object> obj = NanNew<Object>();//Object::New();
    obj->Set(NanNew<String>("name"), NanNew<String>("text"));

    string value = node->Value();
    obj->Set(NanNew<String>("value"), NanNew<String>(value.c_str()));

    return obj;
}/*}}}*/




