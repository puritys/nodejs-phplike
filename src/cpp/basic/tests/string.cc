#include <stdio.h>
#include <stdlib.h>

#include "gtest/gtest.h"
#include "../src/string_cpp.h"


using ::testing::EmptyTestEventListener;
using ::testing::InitGoogleTest;
using ::testing::Test;
using ::testing::TestCase;
using ::testing::TestEventListeners;
using ::testing::TestInfo;
using ::testing::TestPartResult;
using ::testing::UnitTest;

TEST(parse_str, success) {
    map<string, string> result;
    string data = "a=v1&bb=v2&c=v";
    result = parse_str(data);
    int size = result.size();
    ASSERT_EQ(3, size);

    map<string, string>::iterator it;
    it = result.begin();
 
    ASSERT_EQ("a", it->first);
    ASSERT_EQ("v1", it->second);

    it++;
    ASSERT_EQ("bb", it->first);
    ASSERT_EQ("v2", it->second);

    it++;
    ASSERT_EQ("c", it->first);
    ASSERT_EQ("v", it->second);

}


TEST(parse_str, empty_string) {
    map<string, string> result;
    string data = "";
    result = parse_str(data);
    int size = result.size();
    ASSERT_EQ(0, size);
}



int main(int argc, char **argv) {
    InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
