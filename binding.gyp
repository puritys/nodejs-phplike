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
                "LINUX_DEFINE"
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
                "LINUX_DEFINE"
              ],
              "include_dirs": [
                "include/linux"
              ]
            }
          ],
          ['OS=="mac"', {
              "cflags": ["-std=gnu++0x"],
              "libraries": [
                  '/usr/lib/libcurl.dylib'
              ],
              "defines": [
                "LINUX_DEFINE"
              ],
              "include_dirs": [
                "include/linux"
              ]
            }
          ]

      ]

    }
  ]
}
