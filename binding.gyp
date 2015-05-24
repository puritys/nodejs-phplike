{
  "targets": [
    {
      "target_name": "phplike",
      "sources": [ 
          "src/cpp/exec/src/exec.cc",
          "src/cpp/curl/src/util.cc",
          "src/cpp/curl/src/phplikeCppCurl.cc",
          "src/cpp/md5/src/md5.cc",
          "src/cpp/basic/src/string.cc",
          "src/cpp/xml/src/tinyxml2.cpp",
          "src/cpp/socket/src/socket.cc",
          "src/nodeExt/phplikeSocket.cc",
          "src/nodeExt/phplikeXml.cc",
          "src/nodeExt/phplikeCurl.cc",
          "src/nodeExt/phplike.cc"
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
                "include/linux",
                "src/nodeExt/includes",
                "<!(node -e \"require('nan')\")"
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
                "include/linux",
                "src/nodeExt/includes"
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
                "include/linux",
                "src/nodeExt/includes",
                "<!(node -e \"require('nan')\")"
              ]
            }
          ],
          ['OS=="win"', {
              "cflags": ["-std=c++11"],
              "libraries": [
                "wininet", "ws2_32"
              ],
              "defines": [
                "OS_WIN"
              ],
              "include_dirs": [
                "src/nodeExt/includes",
                "<!(node -e \"require('nan')\")"
              ]
            }
          ]

      ]

    }
  ]
}
