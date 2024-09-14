#!/bin/bash

cd /home/ubuntu/depin-alliance-fe
git pull origin staging

NPM=/home/ubuntu/.nvm/versions/node/v18.20.4/bin/npm
PM2=/home/ubuntu/.nvm/versions/node/v18.20.4/bin/pm2

# Install dependencies
$NPM install || { echo "npm install failed"; exit 1; }

# Run build
$NPM run build || { echo "Build failed"; exit 1; }


$PM2 restart depin-fe
