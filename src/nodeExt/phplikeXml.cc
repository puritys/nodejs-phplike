#include "common.h"
#include "phplikeXml.h"


void phpXMLDocument::init(Handle<Object> target) { 
    Nan::HandleScope scope;
    Local<FunctionTemplate> constructor = Nan::New<FunctionTemplate>(phpXMLDocument::New);
    constructor->InstanceTemplate()->SetInternalFieldCount(1); // for constructors
    constructor->SetClassName(Nan::New<String>("phpXMLDocument").ToLocalChecked());

    //NODE_SET_PROTOTYPE_METHOD(constructor, "load", load);
    //NODE_SET_PROTOTYPE_METHOD(constructor, "loadXML", loadXML);
    Nan::SetPrototypeMethod(constructor, "load", load);
    Nan::SetPrototypeMethod(constructor, "loadXML", loadXML);

    //target->Set(Nan::New<String>("DOMDocument"), constructor->GetFunction());
    Handle<Value> key = Nan::New<String>("DOMDocument").ToLocalChecked();
    Nan::Set(target, key, constructor->GetFunction());
}

NAN_METHOD(phpXMLDocument::New) {
    Nan::HandleScope scope;
    phpXMLDocument *d = new phpXMLDocument();
    d->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
}

NAN_METHOD(phpXMLDocument::load) {
    Nan::HandleScope scope;
    String::Utf8Value jsFile(info[0]);
    string file = string(*jsFile);
    phpXMLDocument *d = ObjectWrap::Unwrap<phpXMLDocument>(info.This());
    d->doc.LoadFile(file.c_str());

    //NanReturnValue(parseXML(d));
    Handle<Object> obj = parseXML(d);
    //Nan::Set(obj, Nan::New("key").ToLocalChecked(), Nan::New("value").ToLocalChecked());

    info.GetReturnValue().Set(obj);

}

NAN_METHOD(phpXMLDocument::loadXML) {
    Nan::HandleScope scope;
    String::Utf8Value jsContent(info[0]);
    string content = string (*jsContent);
    phpXMLDocument *d = ObjectWrap::Unwrap<phpXMLDocument>(info.This());
    d->doc.Parse(content.c_str(), content.length());

//    NanReturnValue(parseXML(d));
    Handle<Object> obj = parseXML(d);
    info.GetReturnValue().Set(obj);
}

Handle<Object> phpXMLDocument::parseXML(phpXMLDocument *d) {
    XMLNode* root = d->doc.RootElement();

    Handle<Object> object = Nan::New<Object>();
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
    Handle<Array> arr = Nan::New<Array>();//Array::New();
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

        //arr->Set(index, obj);
        Nan::Set(arr, index, obj);
        index++;

        if (firstChildElement) {
            loadChild(obj, firstChild);
        }
    }
    //object->Set(Nan::New<String>("childNodes"), arr);
    Nan::Set(object, Nan::New<String>("childNodes").ToLocalChecked(), arr);
}/*}}}*/


void phpXMLDocument::setAttributesIntoJs(Handle<Object> obj, XMLNode* node) {/*{{{*/
    Handle<Object> attrObj = Nan::New<Object>();//Object::New();
    XMLElement* elm = node->ToElement();
    const XMLAttribute* attr = elm->FirstAttribute();

    if (attr) {
        for (; attr; attr = attr->Next()) {
            if (attr) {
                Handle<String> name = Nan::New<String>(attr->Name()).ToLocalChecked();
                Handle<String> value = Nan::New<String>(attr->Value()).ToLocalChecked();
                attrObj->Set(name, value);
            }
        }
    }

    //obj->Set(Nan::New<String>("attributes"), attrObj);
    Nan::Set(obj, Nan::New<String>("attributes").ToLocalChecked(), attrObj);
}/*}}}*/


Handle<Object> phpXMLDocument::getNodeInfo(XMLNode* node, XMLNode* firstChildElement) {/*{{{*/

    Handle<Object> obj = Nan::New<Object>();
    XMLElement* element = node->ToElement();
    Handle<String> name = Nan::New<String>(element->Name()).ToLocalChecked();
    //obj->Set(Nan::New<String>("name"), name);
    Nan::Set(obj, Nan::New<String>("name").ToLocalChecked(), name);
    setAttributesIntoJs(obj, node); 
    if (!firstChildElement && node->FirstChild()) {
        Handle<String> val = Nan::New<String>(element->GetText()).ToLocalChecked();
        //obj->Set(Nan::New<String>("value"), val);
        Nan::Set(obj, Nan::New<String>("value").ToLocalChecked(), val);
    } else {
        Handle<String> val = Nan::New<String>("").ToLocalChecked();
        //obj->Set(Nan::New<String>("value"), val);
        Nan::Set(obj, Nan::New<String>("value").ToLocalChecked(), val);
    }
    return obj;
}/*}}}*/

Handle<Object> phpXMLDocument::getTextNodeInfo(XMLNode* node) {/*{{{*/
    Handle<Object> obj = Nan::New<Object>();//Object::New();
    //obj->Set(Nan::New<String>("name"), Nan::New<String>("text"));
    Nan::Set(obj, Nan::New<String>("name").ToLocalChecked(), Nan::New<String>("text").ToLocalChecked());

    string value = node->Value();
    //obj->Set(Nan::New<String>("value"), Nan::New<String>(value.c_str()));
    Nan::Set(obj, Nan::New<String>("value").ToLocalChecked(), Nan::New<String>(value.c_str()).ToLocalChecked());

    return obj;
}/*}}}*/




