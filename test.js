"use strict";

const jasDriver = require("jasdriver");

// const webdriver = require("selenium-webdriver");
//
// var driver = (new webdriver.Builder())
//     .withCapabilities({ browserName: "chrome" })
//     .build();

jasDriver({
    specs: [
        __dirname + "/build/buttercup.js",
        __dirname + "/tests"
    ]
});
