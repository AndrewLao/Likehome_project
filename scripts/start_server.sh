#!/bin/bash
echo starting server

# here we just use npm to run the build
cd /var/www/likehome
echo building application...
sudo npm run build
