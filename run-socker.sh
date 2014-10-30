#!/bin/sh

docker run -i \
    -v /vagrant:/var/www \
    -p 3000:3000 \
    socker
