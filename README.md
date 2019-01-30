# Discord-Radio-Bot-UK
Discord Streaming Bot with installation instructions

## Online Hosting - please see www.glitch.com and use guide: https://anidiots.guide/other-guides/hosting-on-glitch (saving you from leaving your PC on forever!)

## How to use:

Create a Discord Bot:https://discordpy.readthedocs.io/en/rewrite/discord.html

Copy away the Bot "Token" and the Bot "ClientID" for safe keeping.

Create a new folder on the desktop and call it "DiscordBot" (or whatever you want it to be called "RadioBot"?). This is where we will    run the Radio from, so make sure all the Git files/folders are copied to this location.

Open CMD Prompt: navigate to the folder you just created (cd Users\$username$\Desktop\DiscordBot /or RadioBot)

Install all npm prerequisites to that folder path following this guide below:

If you don't already have Python 2.7 and Visual Studio, run npm install --global windows-build-tools
npm install --save discord.js in your bot's project folder
Good to go!

## Installing node.js:

To install discord.js on Windows, you need to begin by installing node.js. If you already have node, please make sure your version is anything greater than or equal to 6.0.0 - you can check using node --version. If it isn't, install it here:

latest version - https://nodejs.org/en/

After installing node.js, make a folder for your bot, for example on the Desktop. Open this folder then SHIFT + RIGHT CLICK anywhere in the empty space, then click Open command window here.

A command prompt should appear. Verify node is installed by typing node --version and hitting enter. If you see the following error message, then please make sure you have installed node.js properly.

:: If you see this message, make sure that you installed node properly:
'node' is not recognized as an internal or external command, operable program or batch file
Installing a C++ compiler
Discord.js has some dependencies that require compiling with C++. If you have Visual Studio 2015 and above, and Python 2.7, you can skip this step.

Open a separate administrator command prompt, you can do this by pressing WindowsKey + X and selecting Command Prompt (Admin). Then enter npm install --global windows-build-tools, which will install Python 2.7 and a C++ compiler for you. This may take a while.

## Installing discord.js

Now we can finally install discord.js! It's time to open up your first command prompt again.

We recommend that you also initialise your bot project as an npm module, which you can do by running npm init, which starts a wizard that guides you through the process. It makes distributing and managing your bot much easier in the future.

Install discord.js with npm install --save discord.js.

If you want your bot to be able to play and receive audio in voice channels, also type npm install --global ffmpeg-binaries node-opus.

You may see UNMET PEER DEP errors, ignore them. You can ensure discord.js is installed by running npm list discord.js

** IMPORTANT ** Open the config.JSON file and put in your Bot "Token" you saved away. this will link the scripts in your Desktop folder to the Discord Bot you created earlier.

## To run the RadioBot from your home PC/server/NAS:

Open CMD Prompt and navigate to the desktop folder again (cd Users\$username$\Desktop\DiscordBot /or RadioBot) and type: node bot.js

If all is well and the above was followed correctly, you should find you have a running Discord Radio bot.

In Discord type "+radio" to pull the bot into your voice channel and if nothing is playing type "+radio" again to start the first stream (which is coded as Capital FM). Use "+radio 1 / 2 / 3 or 4 to change the station.  The streams can be edited inside the bot.js file to whatever stations you prefer. When in Discord type "+list" to list the radio stations available. (All the switchs can be found inside the bot.js file about halfway down the script).

A voila! You now have a fully fucntioning Discord Radio Bot. Hit +botinfo to see extra info.
