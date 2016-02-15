#!/usr/bin/env node

var link = require("fs-symlink"),
    path = require("path"),
    root = path.resolve(__dirname + "/../");

console.log("Trying to create buttercup-web symlink...");
link(root + "/source", root + "/node_modules/__buttercup_web", "junction")
    .then(function () {
        console.log("Symlink created successfully.");
    })
    .catch(function(err) {
        console.error(err);
    });
