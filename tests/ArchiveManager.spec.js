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
        expect(creds.model.get("username")).to.equal("abc123");
        expect(creds.model.get("password")).to.equal("1$55*");
        expect(creds.model.get("type")).to.equal("webdav");
    });

    it("locks and unlocks credentials", function() {
        archiveManager.addCredentials("custom", credentials, "masterPa55");
        expect(archiveManager.isLocked("custom")).to.equal(false);
        return archiveManager
            .lock("custom")
            .then(function() {
                expect(archiveManager.isLocked("custom")).to.be.true;
                expect(archiveManager._archives["custom"].password).to.be.undefined;
            });
    });

    it("saves and loads state", function() {
        archiveManager.addCredentials("custom", credentials, "masterPa55");
        return archiveManager
            .saveState()
            .then(function() {
                archiveManager.loadState();
                expect(archiveManager.isLocked("custom")).to.be.true;
            });
    });

    it("loads and unlocks", function() {
        archiveManager.addCredentials("custom", credentials, "masterPa55");
        return archiveManager
            .saveState()
            .then(function() {
                archiveManager.loadState();
                return archiveManager.unlock("custom", "masterPa55")
                    .then(function(creds) {
                        expect(archiveManager.isLocked("custom")).to.be.false;
                        expect(creds.model.get("username")).to.equal("abc123");
                        expect(creds.model.get("password")).to.equal("1$55*");
                        expect(creds.model.get("type")).to.equal("webdav");
                    });
            });
    });

});
