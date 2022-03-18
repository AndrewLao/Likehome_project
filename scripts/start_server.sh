#!/bin/bash
echo starting server

# here we just use npm to run the build
cd /home/ubuntu/appdeploy/
echo moving build to server path
cp -r /home/ubuntu/appdeploy/likehome/build/* /var/www/likehome/
