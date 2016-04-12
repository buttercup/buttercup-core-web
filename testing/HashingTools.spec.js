var driver = GLOBAL.driver;

module.exports = {

    deriveKeyFromPassword: {

        testReturnsExpectedHash: function(test) {
            driver.executeAsyncScript(
                function() {
                    var callback = arguments[arguments.length - 1];
                    window.Buttercup.Web.HashingTools.deriveKeyFromPassword(
                        "myPass",
                        "mySalt",
                        20000,
                        256
                    )
                    .then(function(hashBytes) {
                        return hashBytes.toString("hex");
                    })
                    .then(function(hash) {
                        (callback)(hash);
                    })
                    .catch(function(err) {
                        (callback)(err);
                    });
                }
            )
            .then(function(hash) {
                console.log("ERR", hash);
                test.strictEqual(hash, "fffff", "Hash should match");
            })
            .then(test.done)
            .catch(function(err) {
                console.error(err);
            });
        }

    }

};
