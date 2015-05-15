{
  "targets": [
    {
      "target_name": "phplike",
      "sources": [ 
          "system/exec/src/exec.cc",
          "system/curl/src/util.cc",
          "system/curl/src/phplikeCppCurl.cc",
          "system/md5/src/md5.cc",
          "system/basic/src/string.cc",
          "system/xml/src/tinyxml2.cpp",
          "system/socket/src/socket.cc",
          "nodejs/phplikeSocket.cc",
          "nodejs/phplikeXml.cc",
          "nodejs/phplikeCurl.cc",
          "nodejs/phplike.cc"
      ],
      "cflags_cc": ["-fexceptions"],
      "conditions": [
            ['OS=="linux" and target_arch!="arm"', {
              "cflags": ["-std=gnu++0x"],

              "libraries": [
                  '-lcurl'
              ],
              "defines": [
                "LINUX_DEFINE", "OS_LINUX"
              ],
              "include_dirs": [
                "include/linux"
              ]
            }
          ],

          ['OS=="linux" and target_arch=="arm"', {
              "cflags": ["-std=gnu++0x"],
              "libraries": [
                  '-lcurl'
              ],
              "defines": [
                "LINUX_DEFINE", "OS_LINUX"
              ],
              "include_dirs": [
                "include/linux"
              ]
            }
          ],
          ['OS=="mac"', {
              "cflags": ["-std=gnu++0x"],
              "xcode_settings": {
                  "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
              },
              "libraries": [
                  '/usr/lib/libcurl.dylib'
              ],
              "defines": [
                "LINUX_DEFINE", "OS_LINUX", "OS_MAC"
              ],
              "include_dirs": [
                "include/linux"
              ]
            }
          ],
          ['OS=="win"', {
              "cflags": ["-std=c++11"],
              "libraries": [
                "wininet"
              ],
              "defines": [
                "OS_WIN"
              ],
              "include_dirs": [
              ]
            }
          ]

      ]

    }
  ]
}
