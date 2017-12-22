#!/bin/sh

if [ -z $(docker images -q arbitrum/apidoc) ]; then
    echo "Building image..."
    docker build -t arbitrum/apidoc .
fi

echo "Mounting working directory..."
docker run --rm -it -p "4000:4000" -v "$(pwd):/app" arbitrum/apidoc /bin/sh
