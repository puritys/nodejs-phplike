{
  "targets": [
    {
      "target_name": "tinyxml2",
      "sources": [ 
          "tinyxml2.cpp"
      ],
      "cflags_cc": ["-fexceptions"],
      "type": "shared_library",
      "conditions": [
        ['OS=="linux"', {
          "cflags": ["-std=gnu++0x"],
          "libraries": [
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
