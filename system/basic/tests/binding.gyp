{
  "targets": [
    {
      "target_name": "test",
      "sources": [ 
          "string.cc"
      ],
      "cflags_cc": ["-fexceptions"],
      "type": "executable",
      "conditions": [
        ['OS=="linux"', {
          "cflags": ["-std=gnu++0x", "-Wl,-rpath=./../src/build/Release", "-L./../src/build/Release"],
          "libraries": [
            "-lgtest", "-lphplikeCppBasic", "-Wl,-rpath=./../src/build/Release -L./../src/build/Release"
          ],
          "defines": [
            "LINUX_DEFINE", "OS_LINUX"
          ],
          "include_dirs": [
            "include/linux"
          ]
        }],

        ['OS=="win"', {
          "type": "static_library",
          "cflags": ["-std=c++11"],
          "libraries": [
          ],
          "defines": [
            "OS_WIN"
          ],
          "include_dirs": [
          ]
        }]
      ]
    }
  ]
}
