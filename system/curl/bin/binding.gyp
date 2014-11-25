{
  "targets": [
    {
      "target_name": "curl",
      "type": "executable",
      "sources": [ 
          "curl.cc"
      ],
      "conditions": [
            ['OS=="linux"', {
              "cflags": ["-std=gnu++0x"],
              "libraries": [
                  "-L/usr/local/lib/node", "-lphplikeCppCurl"
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
          ]
      ]

    }
  ]
}
