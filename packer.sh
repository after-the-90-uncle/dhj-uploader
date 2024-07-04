#!/bin/bash
system_os='macos'
if [ $1 ]; then
    system_os=$1
fi
if [ -d .packer ]; then
    rm -r .packer
fi
if [ -d .packer ]; then
  rm -r .packer 
fi
mkdir .packer
NODE_ENV=packer babel src --out-dir .packer/server 
pkg . -t $system_os 
chmod +x http-upload

