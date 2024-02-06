#!/bin/sh
cd /home/node/app
yarn install
exec "$@"
