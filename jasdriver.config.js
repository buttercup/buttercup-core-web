"use strict";

module.exports = [
    {
        //closeDriverOnFinish: false,
        //exitOnFinish: false,
        specs: [
            __dirname + "/build/buttercup.js",
            __dirname + "/tests"
        ],
        webdriverBrowser: "chrome"
    },
    {
        //closeDriverOnFinish: false,
        //exitOnFinish: false,
        specs: [
            __dirname + "/build/buttercup.js",
            __dirname + "/tests"
        ],
        webdriverBrowser: "firefox"
    }
];
