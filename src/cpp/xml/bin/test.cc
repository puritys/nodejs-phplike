#include "tinyxml2.h"
#include <string>
#include <iostream>
using namespace tinyxml2;
using namespace std;

int main () {

    string bug1 = "<page><head></head></page>";


    XMLDocument doc2;

    doc2.Parse(bug1.c_str());
    XMLElement* elm2 = doc2.FirstChild()->FirstChild()->ToElement();
 //   elm2->GetText();
    
    cout << "name =" <<elm2->Name() <<endl;
    cout <<  "value  =" << elm2->GetText();
//    return 4;
    XMLDocument doc;
    doc.LoadFile("test.xml");

	XMLElement* elm = doc.FirstChildElement("site")->FirstChildElement("css")->FirstChildElement( "item" );
    string title = elm->Value();
	printf( "element text = : %s\n", title.c_str() );
//
//    const XMLAttribute* a = elm->FirstAttribute();
//
//	printf( "Attribute name = %s value = %s\n", a->Name(), a->Value() );
//
//    a = a->Next();
//	printf( "Attribute name = %s value = %s\n", a->Name(), a->Value() );
//
//    elm = elm->NextSiblingElement();
//	title = elm->GetText();
//	printf( "element text = : %s\n", title.c_str());

    printf("g ");
    XMLNode* node = doc.FirstChildElement()->FirstChildElement();//->FirstChildElement();
    XMLElement* text;

    node = node->FirstChild();
    for (;node; node = node->NextSibling()) {
      
        XMLElement* elm = node->ToElement();
        if (elm) {
    	    printf( "First child name = %s value = %s \n", elm->Name(), elm->GetText());
        } else {
    	    printf( "First child name = %s \n", node->Value());//, elm->Value());
        }
//break;
    }
 //   string value = text->FirstChild()->NextSibling()->NextSibling()->NextSibling()->Value();//GetText();
//	printf( "First child name = %s value =%s \n", text->Name(), value.c_str() );



    return 1;
}
