os=$(uname)
if [ "$os" = "Darwin" ]; then
    # Open on default browser
    open ./src/index.html
elif [ "$os" = "Linux" ]; then
    # Open on Google chrome on Linux
    google-chrome ./src/index.html
fi
