#include "tinyxml2.h"
#include <string>
using namespace tinyxml2;
using namespace std;

int main () {
    XMLDocument doc;
    doc.LoadFile("test.xml");

	XMLElement* elm = doc.FirstChildElement("site")->FirstChildElement("css")->FirstChildElement( "item" );
    string title = elm->GetText();
	printf( "element text = : %s\n", title.c_str() );

    const XMLAttribute* a = elm->FirstAttribute();

	printf( "Attribute name = %s value = %s\n", a->Name(), a->Value() );

    a = a->Next();
	printf( "Attribute name = %s value = %s\n", a->Name(), a->Value() );

    elm = elm->NextSiblingElement();
	title = elm->GetText();
	printf( "element text = : %s\n", title.c_str());


    return 1;
}
