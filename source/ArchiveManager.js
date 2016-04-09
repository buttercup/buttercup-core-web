(function(module) {

    "use strict";

    var Buttercup = require("buttercup"),
        Credentials = Buttercup.Credentials,
        StorageInterface = require("__buttercup_web/StorageInterface.js");

    var ArchiveManager = module.exports = function() {
        this._archives = {};
    };

    ArchiveManager.prototype.addCredentials = function(name, credentials, password) {
        this._archives[name] = {
            status: ArchiveManager.ArchiveStatus.UNLOCKED,
            credentials: credentials,
            password: password
        };
    };

    ArchiveManager.prototype.getCredentials = function(name) {
        if (this.isLocked(name)) {
            throw new Error("Credentials are locked");
        }
        return this._archives[name].credentials;
    };

    ArchiveManager.prototype.isLocked = function(name) {
        return this._archives[name].status === ArchiveManager.ArchiveStatus.LOCKED;
    };

    ArchiveManager.prototype.loadState = function() {
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
            return details.credentials.convertToSecureContent(details.password)
                .then(function(secureContent) {
                    details.credentials = secureContent;
                    delete details.password;
                });
        }
        return Promise.resolve();
    };

    ArchiveManager.prototype.saveState = function() {
        var packet = {
            archives: {}
        };
        return Promise.all(
                Object.keys(this._archives).map((name) => {
                    let archiveDetails = this._archives[name];
                    return (this.isLocked(name)) ?
                        Promise.resolve() :
                        archiveDetails.credentials
                            .convertToSecureContent(archiveDetails.password)
                            .then((content) => {
                                packet.archives[name] = content;
                            });
                })
            ).then(function() {
                StorageInterface.setData("archiveManager", packet);
            });
    };

    ArchiveManager.prototype.unlock = function(name, password) {
        var archiveDetails = this._archives[name];
        if (!this.isLocked(name)) {
            return Promise.resolve(archiveDetails);
        }
        return Credentials.createFromSecureContent(archiveDetails.credentials, password)
            .then((credentials) => {
                if (!credentials) {
                    return Promise.reject(new Error("Failed unlocking credentials: " + name));
                }
                archiveDetails.credentials = credentials;
                archiveDetails.password = password;
                archiveDetails.status = ArchiveManager.ArchiveStatus.UNLOCKED;
                return credentials;
            });
    };

    ArchiveManager.ArchiveStatus = {
        LOCKED: "locked",
        UNLOCKED: "unlocked"
    };

})(module);
