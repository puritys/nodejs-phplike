{
  "targets": [
    {
      "target_name": "exec",
      "sources": [ 
          "exec.cc"
      ],
 
      "cflags_cc": ["-fexceptions"],
      "type": "executable",
      "conditions": [
            ['OS=="linux" and target_arch!="arm"', {
              "cflags": ["-std=gnu++0x"],

              "libraries": [
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
                  "-lexec"
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
              "libraries": [
                  "<(CWD)\\..\\src\\build\\Release\\exec.lib"
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
