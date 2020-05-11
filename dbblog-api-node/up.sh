#!/usr/bin/env bash
env=$1
if [ -z $1 ];then
  env=1
fi
if [ ${env} = "product" ];then
  scp -P 8931 release/*.tar.gz root@202.61.88.250:/var/www/server
  exit 0
fi
scp release/*.tar.gz dcjt@114.116.21.95:/var/www/server