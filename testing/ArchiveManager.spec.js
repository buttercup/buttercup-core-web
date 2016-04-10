var driver = GLOBAL.driver;

function handleError(err) {
    console.error(err);
}

module.exports = {

    setUp: function(done) {
        driver.executeScript(function() {
            var Buttercup = window.Buttercup,
                Credentials = Buttercup.Credentials;
            var ButtercupWeb = window.Buttercup.Web,
                ArchiveManager = ButtercupWeb.ArchiveManager;

            window.credentials = new Credentials({
                username: "abc123",
                password: "1$55*",
                type: "webdav"
            });
            window.archiveManager = new ArchiveManager();
        });
        (done)();
    },

    testSetsAndGetsCredentials: function(test) {
        driver.executeScript(
            function() {
                archiveManager.addCredentials("custom", credentials, "masterPa55");
                var creds = archiveManager.getCredentials("custom");
                return creds.model.getData();
            }
        )
        .then(function(model) {
            test.strictEqual(model.username, "abc123", "Username should be correct");
            test.strictEqual(model.password, "1$55*", "Password should be correct");
            test.strictEqual(model.type, "webdav", "Type should be correct");
        })
        .then(test.done)
        .catch(handleError);
    },

    testsLocksAndUnlocksCredentials: function(test) {
        driver.executeAsyncScript(
            function() {
                var callback = arguments[arguments.length - 1];
                archiveManager.addCredentials("custom", credentials, "masterPa55");
                var wasLocked = archiveManager.isLocked("custom");
                archiveManager.lock("custom")
                    .then(function() {
                        (callback)({
                            locked: archiveManager.isLocked("custom"),
                            password: archiveManager._archives["custom"].password,
                            wasLocked: wasLocked
                        });
                    })
                    .catch(function() {
                        (callback)({});
                    });
            }
        )
        .then(function(result) {
            test.strictEqual(result.wasLocked, false, "Archive should not have been locked to start with");
            test.strictEqual(result.locked, true, "Archive should be locked");
            test.ok(!result.password, "Password should not be defined");
        })
        .then(test.done)
        .catch(handleError);
    },

    testSavesAndLoadsState: function(test) {
        driver.executeAsyncScript(
            function() {
                var callback = arguments[arguments.length - 1];
                archiveManager.addCredentials("custom", credentials, "masterPa55");
                archiveManager.saveState()
                    .then(function() {
                        archiveManager.loadState();
                        callback(archiveManager.isLocked("custom"));
                    });
            }
        )
        .then(function(locked) {
            test.strictEqual(locked, true, "Archive should be locked after loading state");
        })
        .then(test.done)
        .catch(handleError);
    },

    testLoadsAndUnlocks: function(test) {
        driver.executeAsyncScript(
            function() {
                var callback = arguments[arguments.length - 1];
                archiveManager.addCredentials("custom", credentials, "masterPa55");
                archiveManager.saveState()
                    .then(function() {
                        archiveManager.loadState();
                        return archiveManager.unlock("custom", "masterPa55")
                            .then(function(creds) {
                                (callback)(creds.model.getData());
                                (done)();
                            });
                    });
            }
        )
        .then(function(result) {
            test.strictEqual(result.username, "abc123", "Username should be correct");
        })
        .then(test.done)
        .catch(handleError);
    }

};
