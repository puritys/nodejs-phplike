#include "tinyxml2.h"
#include <string>
using namespace tinyxml2;
using namespace std;

int main () {
    XMLDocument doc;
    doc.LoadFile("test.xml");
    printf("load end\n");
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

    XMLNode* node = doc.FirstChildElement()->FirstChildElement();//->FirstChildElement();
//    printf("g ");
    XMLElement* text;
  //  node = node->NextSibling();

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
