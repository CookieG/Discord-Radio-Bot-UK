# Discord-Radio-Bot-UK
Discord Streaming Bot with installation instructions



Node.js v6 and above
If you don't already have Python 2.7 and Visual Studio, run npm install --global windows-build-tools
npm install --save discord.js in your bot's project folder
Good to go!
Installing node.js
To install discord.js on Windows, you need to begin by installing node.js. If you already have node, please make sure your version is anything greater than or equal to 6.0.0 - you can check using node --version. If it isn't, install it here

After installing node.js, make a folder for your bot, for example on the Desktop. Open this folder then SHIFT + RIGHT CLICK anywhere in the empty space, then click Open command window here.

A command prompt should appear. Verify node is installed by typing node --version and hitting enter. If you see the following error message, then please make sure you have installed node.js properly.

:: If you see this message, make sure that you installed node properly:
'node' is not recognized as an internal or external command, operable program or batch file
Installing a C++ compiler
Discord.js has some dependencies that require compiling with C++. If you have Visual Studio 2015 and above, and Python 2.7, you can skip this step.

Open a separate administrator command prompt, you can do this by pressing WindowsKey + X and selecting Command Prompt (Admin). Then enter npm install --global windows-build-tools, which will install Python 2.7 and a C++ compiler for you. This may take a while.

Installing discord.js
Now we can finally install discord.js! It's time to open up your first command prompt again.

We recommend that you also initialise your bot project as an npm module, which you can do by running npm init, which starts a wizard that guides you through the process. It makes distributing and managing your bot much easier in the future.

Install discord.js with npm install --save discord.js.

If you want your bot to be able to play and receive audio in voice channels, also type npm install --global ffmpeg-binaries node-opus.

You may see UNMET PEER DEP errors, ignore them. You can ensure discord.js is installed by running npm list discord.js
