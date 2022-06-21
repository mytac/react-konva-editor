#!/bin/bash
rm -rf ./dist && npx tsc && cp {package.json,README.md} ./dist/ -r && npm unpublish react-konva-editor@1.0.2 && cd ./dist && npm publish
# 删除老版本
# 发布新版本