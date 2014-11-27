{
  "targets": [
    {
      "target_name": "phplike",
      "sources": [ 
          "system/exec/src/exec.cc",
          "system/curl/src/util.cc",
          "system/curl/src/phplikeCppCurl.cc",
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
                "LINUX_DEFINE", "OS_LINUX"
              ],
              "include_dirs": [
                "include/linux"
              ]
            }
          ],
          ['OS=="win"', {
              "cflags": ["-std=c++11"],
              "type": "static_library",
              "libraries": [
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
