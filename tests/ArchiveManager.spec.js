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

    it("locks and unlocks credentials", function() {
        archiveManager.addCredentials("custom", credentials, "masterPa55");
        expect(archiveManager.isLocked("custom")).toBe(false);
        archiveManager.lock("custom");
        expect(archiveManager.isLocked("custom")).toBe(true);
        expect(archiveManager._archives["custom"].password).not.toBeDefined();
    });

    it("saves and loads state", function() {
        archiveManager.addCredentials("custom", credentials, "masterPa55");
        archiveManager.saveState();
        archiveManager.loadState();
        expect(archiveManager.isLocked("custom")).toBe(true);
    });

    it("loads and unlocks", function() {
        archiveManager.addCredentials("custom", credentials, "masterPa55");
        archiveManager.saveState();
        archiveManager.loadState();
        var creds = archiveManager.unlock("custom", "masterPa55");
        expect(archiveManager.isLocked("custom")).toBe(false);
        expect(creds.model.get("username")).toBe("abc123");
        expect(creds.model.get("password")).toBe("1$55*");
        expect(creds.model.get("type")).toBe("webdav");
    });

});
