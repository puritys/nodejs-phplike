# Preinstall in  Mac system. # 
# sudo ln -sf /usr/bin/make /usr/bin/gmake
##############################

.PHONY: src bin


all:
	gmake src
	gmake bin

test:
	gmake src
	gmake bin	


#########################
## The compile command ##
#########################

curlpp:
	cd src/curlpp && ./configure && gmake  && sudo gmake install && sudo ldconfig 

src:
	cd src && gmake clean &&  gmake all && sudo ldconfig
 
bin:
	cd bin && gmake  all && ./curl.o

