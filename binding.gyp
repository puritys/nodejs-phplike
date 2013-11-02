{
  "targets": [
    {
      "target_name": "phplike",
      "sources": [ 
          "system/exec/src/exec.cc",
          "nodejs/phplike.cc"
      ],
      "conditions": [
            ['OS=="linux"', {
              "cflags": ["-std=gnu++0x"],
              "defines": [
                "LINUX_DEFINE"
              ],
              "include_dirs": [
                "include/linux"
              ],
              "libraries" : ["-std=gnu++0x"]
            }
          ]
      ]

    }
  ]
}
