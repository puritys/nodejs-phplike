{
  "targets": [
    {
      "target_name": "test",
      "sources": [ 
          "test.cpp"
      ],
      "cflags_cc": ["-fexceptions"],
      "type": "executable",
      "conditions": [
        ['OS=="linux"', {
          "cflags": ["-std=gnu++0x", "-Wl,-rpath=./../src/build/Release -L./../src/build/Release"],
          "libraries": [
            "-ltinyxml2", "-Wl,-rpath=./../src/build/Release/ -L./../src/build/Release/"
          ],
          "defines": [
            "LINUX_DEFINE", "OS_LINUX"
          ],
          "include_dirs": [
            "include/linux", "./../src/"
          ]
        }],

        ['OS=="win"', {
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
