#!/usr/bin/env bash
PARAM=$1
if [ -z ${PARAM} ];then
  PARAM="linux"
else
  envs=("linux" "mac" "win")
  tmp=0
  for v in ${envs[@]}
  do
    if [ ${v} = ${PARAM} ];then
      tmp=1
    fi
  done
  if [ ${tmp} -eq 0 ];then
    PARAM="linux"
  fi
fi
echo "*********The pkg env is ${PARAM}**********"
RELEASE_VERSION=`date +%Y%m%d_%H%M%S`
rm -rf build
mkdir build
# npm run build
echo "{\"version\":\""${RELEASE_VERSION}"\"}" > build/version.json
npm run pkg-${PARAM}
echo "============finshed: pkg!=========="
cp -rf sbin build/nodeApp.${PARAM}/
cp -rf doc build/nodeApp.${PARAM}/
cp -rf public build/nodeApp.${PARAM}/
cp -rf deploy build/nodeApp.${PARAM}/
rm -rf release
mkdir -p release
cd build
GZIP_FILE=nodeApp.release_${PARAM}.${RELEASE_VERSION}.tar.gz
tar zcf ../release/${GZIP_FILE} nodeApp.${PARAM}
touch ../release/${GZIP_FILE}.publish
echo "finished: "${GZIP_FILE}"*"

up=$2
if [ ${up} -a ${up} = 'up' ];then
  cd ..;source up.sh product
fi