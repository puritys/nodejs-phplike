{
  "targets": [
    {
      "target_name": "phplike",
      "sources": [ 
          "system/exec/src/exec.cc",
          "system/curl/src/phplikeCppCurl.cc",
          "nodejs/phplikeCurl.cc",
          "nodejs/phplike.cc"
      ],
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
          ]

      ]

    }
  ]
}
