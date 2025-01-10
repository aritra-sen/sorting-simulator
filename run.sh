# Open the website on Chrome for Mac/Linux 
os=$(uname)
if [ "$os" = "Darwin" ]; then
    open -a "Google Chrome" ./src/index.html
elif [ "$os" = "Linux" ]; then
    google-chrome ./src/index.html
fi
