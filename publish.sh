#!/bin/bash
npm run build
cd ..
if [ -d uploader ]; then
  rm -r uploader
fi
mkdir uploader
cd dhj-uploader
cp README.md ../uploader
cp index.html ../uploader
mv dist ../uploader/lib
cp package.json ../uploader
cd ../uploader
