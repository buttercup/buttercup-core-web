(function(module) {

    "use strict";

    var Buttercup = require("buttercup"),
        Credentials = Buttercup.Credentials;

    var ArchiveManager = module.exports = function() {
        this._archives = {};
    };

    ArchiveManager.prototype.addArchiveCredentials = function(name, credentials) {
        this._archives[name] = {
            status: (typeof credentials === "string") ?
                ArchiveManager.ArchiveStatus.LOCKED :
                ArchiveManager.ArchiveStatus.UNLOCKED,
            credentials: credentials
        };
    };

    ArchiveManager.prototype.isLocked = function(name) {
        return this._archives[name].status === ArchiveManager.ArchiveStatus.LOCKED;
    };

    ArchiveManager.prototype.unlock = function(name, password) {
        var archiveDetails = this._archives[name],
            credentials = Credentials.fromSecureContent(archiveDetails.credentials, password);
        if (!credentials) {
            throw new Error("Failed unlocking credentials: " + name);
        }
        archiveDetails.credentials = credentials;
        return credentials;
    };

    ArchiveManager.ArchiveStatus = {
        LOCKED: "locked",
        UNLOCKED: "unlocked"
    };

})(module);
