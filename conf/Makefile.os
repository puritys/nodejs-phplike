UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Linux)
    soExt=so
endif
ifeq ($(UNAME_S),Mac)
    soExt=dylib
endif

