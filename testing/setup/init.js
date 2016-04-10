"use strict";

var fs = require("fs"),
    path = require("path"),
    webdriver = require("selenium-webdriver");

GLOBAL.driver = (new webdriver.Builder())
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

var page = '<html><head><title>Testing</title><script src="buttercup.js"></script></html>',
    location = path.resolve(__dirname, "../../build/test.html"),
    url = "file://" + location;

fs.writeFileSync(location, page);

module.exports = {

    testBootsTestPage: function(test) {
        driver.get(url);
        driver.getTitle()
            .then(function(title) {
                test.strictEqual(title, "Testing", "Title should be correct");
            })
            .then(test.done);
    }

};
