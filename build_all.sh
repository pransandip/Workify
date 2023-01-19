#!/bin/bash

mkdir extension
npm run build
mv build extension
# cd add-keyword popup
# npm run build
# mv build add-keyword
# mv add-keyword ../extension
# cd ../popup-main
# npm run build
# mv build main-poup
# mv main-popup ../extensionp