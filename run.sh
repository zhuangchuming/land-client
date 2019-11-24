#!/bin/bash
upurl='root@118.190.57.196:/home/chuming/client/web/'
echo 上传地址:$upurl
if [ $1 = 'up' ]
then  cd dist/ &&  scp -r static/ index.html $upurl;
else npm run build && cd dist/ &&  scp -r static/ index.html $upurl
fi