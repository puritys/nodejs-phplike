{
  "targets": [
    {
      "target_name": "exec",
      "sources": [ 
          "exec.cc"
      ],
 
      "cflags_cc": ["-fexceptions"],
      "type": "shared_library",
      "conditions": [
            ['OS=="linux" and target_arch!="arm"', {
              "cflags": ["-std=gnu++0x"],

              "libraries": [
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
              "xcode_settings": {
                  "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
              },
              "libraries": [
              ],
              "defines": [
                "LINUX_DEFINE"
              ],
              "include_dirs": [
                "include/linux"
              ]
            }
          ],
          ['OS=="win32"', {
              "cflags": ["-std=c++11"],
              "libraries": [
              ],
              "defines": [
              ],
              "include_dirs": [
              ]
            }
          ]

      ]

    }
  ]
}
