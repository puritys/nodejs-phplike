{
  "targets": [
    {
      "target_name": "phplikeCppSocket",
      "cflags_cc": ["-fexceptions"],
      "type": "shared_library",
      "conditions": [
        ['OS=="linux"', {
          "sources": [ 
              "socket.cc"
          ],
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
          "sources": [ 
              "socket_win.cc"
          ],
          "type": "static_library",
          "cflags": ["-std=c++11"],
          "libraries": [
             "wininet.lib" 
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
