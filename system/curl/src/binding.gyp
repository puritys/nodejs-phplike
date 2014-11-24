{
  "targets": [
    {
      "target_name": "phplikeCppCurl",
      "sources": [ 
          "phplikeCppCurl.cc"
      ],
      "cflags": ["-std=gnu++0x"],
      "type": "shared_library",
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
}
