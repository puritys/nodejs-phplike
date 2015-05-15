{
  "targets": [
    {
      "target_name": "socket",
      "type": "executable",
      "sources": [ 
          "socket.cc"
      ],
      "conditions": [
            ['OS=="linux"', {
              "cflags": ["-std=gnu++0x"],
              "libraries": [
                "-Wl,-rpath,./../src/build/Release", "-lphplikeSocket" 
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
              "cflags": [],
              "libraries": [
                  "/usr/local/lib/node/libphplikeCppCurl.dylib"
              ],
              "defines": [
                "LINUX_DEFINE"
              ],
              "include_dirs": [
                "include/linux"
              ]
            }
          ],

          ['OS=="win"', {
              "cflags": [],
              "libraries": [
                  "<(CWD)\\..\\src\\build\\Release\\phplikeSocket.lib"
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
