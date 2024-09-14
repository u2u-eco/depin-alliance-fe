#!/bin/bash

git pull origin staging

# Install dependencies
npm install || { echo "npm install failed"; exit 1; }

# Run build
npm run build || { echo "Build failed"; exit 1; }


pm2 restart depin-fe
