# 1. Prepare Stable Diffusion
Deforum needs to be installed.

In the Stable Diffusion webui-user.bat, add the following to the COMMANDLINE_ARGS:
```
set COMMANDLINE_ARGS= --api --deforum-api
```

Then you can double click on the bat file and run Stable Diffusion



# 2. Install NodeJS

Download and install NodeJS: 
[nodejs.org](https://nodejs.org/en)

Then install npm:
[https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)



# 3. Download this repo

Clone this repo into a folder on your local computer.



# 4. Install the node_modules for the client

Open a terminal and navigate to the client folder by typing and then dragging the client folder into the terminal. For me it will look like this:
```
 cd C:\Users\mail\Documents\Github\stable-diffusion-api\client
```
Now you are inside the client folder of this application

Type:
```
npm install
```

If this error pops up, you can ignore it by now: 
**8 vulnerabilities (2 moderate, 6 high)**



# 5. Install the node_modules for the server

Open a **new** terminal and navigate to the server folder by typing and then dragging the client folder into the terminal. For me it will look like this:
```
 cd C:\Users\mail\Documents\Github\stable-diffusion-api\server
```
Now you are inside the server folder of this application

Type:
```
npm install
```

If this error pops up, you can ignore it by now: 
**1 moderate severity vulnerability**



# 6. Check
Now you have three terminal windows open.
1. Stable Diffusion
2. Client
3. Server

And also you should have installed all the node_modules in the client and server folders


# 7. Adjust path in server
You need to tell the server where Stable Diffusion saves its images.

In the server folder in the server.mjs file look at around line 15
```
const baseDir = 'E:\\output\\sd-api';
```
Here you need to put in the path of your stable diffusion output folder.

To get the right path, open a new terminal window type cd and throw your outputs folder inside
```
cd C:\stable-diffusion\stable-diffusion-webui-api\outputs
```
Then this will be the path **C:\stable-diffusion\stable-diffusion-webui-api\outputs** to put into the server.mjs file.
```
const baseDir = 'C:\stable-diffusion\stable-diffusion-webui-api\outputs';
```

And in around line 32 you also need to put this path
```
const imagesDir = 'C:\stable-diffusion\stable-diffusion-webui-api\outputs\images';
```
but with images at the end



# 