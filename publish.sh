#!/bin/bash
npm run build
cd ..
if [ -d uploader ]; then
  rm -r uploader
fi
mkdir uploader
cd http-upload-server
cp index.html ../uploader/index.html
mv dist ../uploader/lib
cp package.json ../uploader
cd ../uploader
