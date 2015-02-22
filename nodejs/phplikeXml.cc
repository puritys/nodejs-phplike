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
    return Handle<Value> (String::New("local var"));
}

Handle<Value> getElementsByTagName(const Arguments &args) {

}



