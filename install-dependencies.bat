@echo off
echo Please enter the Stable Diffusion output path (e.g., E:/output/sd-api):
set /p SDPath=

echo Creating temporary script to update config.js...
echo var fs = require('fs'); > tempScript.js
echo var path = '%SDPath%'; >> tempScript.js
echo fs.writeFileSync('server/config.js', `export const basePath = '%SDPath%';`, 'utf8'); >> tempScript.js

echo Updating config.js with provided path...
cd server
node ../tempScript.js
cd..

echo Removing temporary script...
del tempScript.js

echo Installing dependencies for the client...
cd client
npm install
cd..

echo Installing dependencies for the server...
cd server
npm install
cd..

echo Dependencies have been installed.
pause
