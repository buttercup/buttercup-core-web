describe("ArchiveManager", function() {

    "use strict";

    var Buttercup = window.Buttercup,
        Credentials = Buttercup.Credentials;

    var ButtercupWeb = window.Buttercup.Web,
        ArchiveManager = ButtercupWeb.ArchiveManager;

    var credentials,
        archiveManager;

    beforeEach(function() {
        credentials = new Credentials({
            username: "abc123",
            password: "1$55*",
            type: "webdav"
        });
        archiveManager = new ArchiveManager();
    });

    it("sets and gets credentials", function() {
        archiveManager.addCredentials("custom", credentials, "masterPa55");
        var creds = archiveManager.getCredentials("custom");
        expect(creds.model.get("username")).toBe("abc123");
        expect(creds.model.get("password")).toBe("1$55*");
        expect(creds.model.get("type")).toBe("webdav");
    });

    it("locks and unlocks credentials", function(done) {
        archiveManager.addCredentials("custom", credentials, "masterPa55");
        expect(archiveManager.isLocked("custom")).toBe(false);
        archiveManager.lock("custom")
            .then(function() {
                expect(archiveManager.isLocked("custom")).toBe(true);
                expect(archiveManager._archives["custom"].password).not.toBeDefined();
                (done)();
            });
    });

    it("saves and loads state", function(done) {
        archiveManager.addCredentials("custom", credentials, "masterPa55");
        archiveManager.saveState()
            .then(function() {
                archiveManager.loadState();
                expect(archiveManager.isLocked("custom")).toBe(true);
                (done)();
            });
    });

    it("loads and unlocks", function(done) {
        archiveManager.addCredentials("custom", credentials, "masterPa55");
        archiveManager.saveState()
            .then(function() {
                archiveManager.loadState();
                return archiveManager.unlock("custom", "masterPa55")
                    .then(function(creds) {
                        expect(archiveManager.isLocked("custom")).toBe(false);
                        expect(creds.model.get("username")).toBe("abc123");
                        expect(creds.model.get("password")).toBe("1$55*");
                        expect(creds.model.get("type")).toBe("webdav");
                        (done)();
                    });
            })
            .catch(function(err) {
                console.error(err);
            });
    });

});
