#!/bin/bash

node node_modules/browserify/bin/cmd.js node_modules/buttercup/source/module.js --insert-globals -o build/buttercup.js
