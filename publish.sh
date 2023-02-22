#!/bin/bash
REPO="http://localhost:4873/"
rm -rf ./dist && rm -rf ./lib && yarn build && cp {package.json,README.md} ./dist/ -r 
echo "【copied!】"
npm unpublish react-konva-editor@1.0.2 --force --registry $REPO|| echo "no need to unpublish"
echo "【unpublished successfully!】"
cd ./dist && npm publish --registry $REPO
echo "【published!!】"
echo $n press any key to exit: $c
read name
echo "$name"

# 删除老版本
# 发布新版本