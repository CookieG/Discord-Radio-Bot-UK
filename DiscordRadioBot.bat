if not "%minimized%"=="" goto :minimized
set minimized=true
@echo off

cd "C:\Users\graha\Desktop\DicordRadioBot"

start /min cmd /C "node bot.js"
goto :EOF
:minimized