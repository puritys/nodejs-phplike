{
  "targets": [
    {
      "target_name": "curl",
      "type": "executable",
      "sources": [ 
          "curl.cc"
      ],
      "conditions": [
            ['OS=="linux" and target_arch!="arm"', {
              "cflags": ["-std=gnu++0x"],
              "libraries": [
                  '-lphplikeCppCurl'
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
                  '-lphplikeCppCurl'
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

      ]

    }
  ]
}
