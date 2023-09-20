#!/bin/bash
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";

DEV_ENV="-dev"
PROD_ENV="-prod"


if test $1 = $DEV_ENV
then
  REPO="http://localhost:4873/"
elif test $1 = $PROD_ENV
then
  token=$(cat ./.npm_token)
  echo "token=$token"
  REPO="https://registry.npmjs.org/"
else
  echo "enviroment invalid"
  exit 8
fi

echo "REPO=$REPO"
version=$(jq -r '.version' package.json)

npm unpublish react-konva-editor@$version --force --registry $REPO|| echo "【no need to unpublish】"
echo "【unpublish!!】"

echo $n press any key to exit: $c
read name
echo "$name"

# 删除老版本
# 发布新版本