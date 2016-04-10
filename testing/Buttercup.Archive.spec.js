module.exports = {

    testExistsOnWindow: function(test) {
        GLOBAL.driver.executeScript("return typeof window.Buttercup.Archive")
            .then(function(type) {
                test.strictEqual(type, "function", "Archive should be a function");
            })
            .then(test.done)
            .catch(function(err) {
                console.error(err);
            });
    }

};
