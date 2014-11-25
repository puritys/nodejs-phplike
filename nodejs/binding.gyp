{
  "targets": [
    {
      "target_name": "phplike",
      "sources": [ 
          "phplikeCurl.cc",
          "phplike.cc"
      ],
      "cflags": ["-std=gnu++0x"],
      "cflags_cc": ["-fexceptions"],
      "type": "shared_library",
      "libraries": [
          "-L/usr/local/lib/node", "-lphplikeCppCurl","-lexec"
      ],
      "defines": [
        "LINUX_DEFINE"
      ],
      "include_dirs": [
        "include/linux"
      ]

    }
  ]
}
