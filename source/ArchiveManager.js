(function(module) {

    "use strict";

    var Buttercup = require("buttercup"),
        Credentials = Buttercup.Credentials,
        StorageInterface = require("__buttercup_web/StorageInterface.js");

    var ArchiveManager = function() {
        this._archives = {};
    };

    ArchiveManager.prototype.addArchiveCredentials = function(name, credentials, password) {
        this._archives[name] = {
            status: ArchiveManager.ArchiveStatus.UNLOCKED,
            credentials: credentials,
            password: password
        };
    };

    ArchiveManager.prototype.isLocked = function(name) {
        return this._archives[name].status === ArchiveManager.ArchiveStatus.LOCKED;
    };

    ArchiveManager.prototype.loadData = function() {
        this._archives = {};
        var loadedData = StorageInterface.getData("archiveManager", { archives: {} });
        for (var name in loadedData.archives) {
            this._archives[name] = {
                status: ArchiveManager.ArchiveStatus.LOCKED,
                credentials: loadedData.archives[name]
            };
        }
    };

    ArchiveManager.prototype.lock = function(name) {
        var details = this._archives[name];
        if (details.status === ArchiveManager.ArchiveStatus.UNLOCKED) {
            details.status = ArchiveManager.ArchiveStatus.LOCKED;
            details.credentials = details.credentials.toSecure(details.password);
            delete details.password;
        }
    };

    ArchiveManager.prototype.saveState = function() {
        var packet = {
            archives: {}
        };
        for (var name in this._archives) {
            if (this._archives.hasOwnProperty(name)) {
                packet.archives[name] = this.isLocked(name) ?
                    this._archives[name].credentials :
                    this._archives[name].credentials.toSecure(this._archives[name].password);
            }
        }
        StorageInterface.setData("archiveManager", packet);
    };

    ArchiveManager.prototype.unlock = function(name, password) {
        if (!this.isLocked(name)) {
            return false;
        }
        var archiveDetails = this._archives[name],
            credentials = Credentials.fromSecureContent(archiveDetails.credentials, password);
        if (!credentials) {
            throw new Error("Failed unlocking credentials: " + name);
        }
        archiveDetails.credentials = credentials;
        archiveDetails.password = password;
        archiveDetails.status = ArchiveManager.ArchiveStatus.UNLOCKED;
        return true;
    };

    ArchiveManager.ArchiveStatus = {
        LOCKED: "locked",
        UNLOCKED: "unlocked"
    };

})(module);
