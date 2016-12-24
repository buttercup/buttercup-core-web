(function(module) {

    "use strict";

    var Buttercup = require("buttercup"),
        Credentials = Buttercup.Credentials,
        DatasourceAdapter = Buttercup.DatasourceAdapter,
        SharedWorkspace = Buttercup.SharedWorkspace,
        StorageInterface = require("__buttercup_web/StorageInterface.js");

    /**
     * Archive Manager - manages a set of archives for the browser
     * @class ArchiveManager
     */
    class ArchiveManager {

        constructor() {
            this._archives = {};
        }

        get archives() {
            return this._archives;
        }

        get displayList() {
            let archives = this.archives;
            return Object.keys(archives).map(name => ({
                name,
                status: archives[name].status
            }));
        }

        addArchive(name, workspace, credentials, masterPassword) {
            if (this._archives[name]) {
                throw new Error(`Archive already exists: ${name}`);
            }
            this._archives[name] = {
                status: ArchiveManager.ArchiveStatus.UNLOCKED,
                workspace,
                credentials,
                password: masterPassword
            };
        }

        isLocked(name) {
            if (!this._archives[name]) {
                throw new Error(`Archive not found: ${name}`);
            }
            return this._archives[name].status === ArchiveManager.ArchiveStatus.LOCKED;
        }

        loadState() {
            this._archives = {};
            var loadedData = StorageInterface.getData("archiveManager", { archives: {} });
            for (var name in loadedData.archives) {
                this._archives[name] = {
                    status: ArchiveManager.ArchiveStatus.LOCKED,
                    credentials: loadedData.archives[name]
                };
            }
        }

        lock(name) {
            if (!this._archives[name]) {
                throw new Error(`Archive not found: ${name}`);
            }
            if (this.isLocked(name)) {
                throw new Error(`Archive already locked: ${name}`);
            }
            let details = this._archives[name];
            details.status = ArchiveManager.ArchiveStatus.PROCESSING;
            return details.credentials
                .convertToSecureContent(details.password)
                .then(function(encContent) {
                    details.credentials = encContent;
                    delete details.workspace;
                    delete details.password;
                    details.status = ArchiveManager.ArchiveStatus.LOCKED;
                });
        }

        saveState() {
            var packet = {
                    archives: {}
                },
                delayed = [Promise.resolve()]
            Object.keys(this._archives).forEach((name) => {
                let archiveDetails = this._archives[name];
                if (archiveDetails.status === ArchiveManager.ArchiveStatus.LOCKED) {
                    packet.archives[name] = archiveDetails.credentials;
                } else {
                    delayed.push(
                        archiveDetails.credentials
                            .convertToSecureContent(archiveDetails.password)
                            .then(function(content) {
                                packet.archives[name] = content;
                            })
                    );
                }
            });
            return Promise
                .all(delayed)
                .then(function() {
                    StorageInterface.setData("archiveManager", packet);
                });
        }

        unlock(name, password) {
            var archiveDetails = this._archives[name];
            if (!this.isLocked(name)) {
                return Promise.resolve(archiveDetails);
            }
            archiveDetails.status = ArchiveManager.ArchiveStatus.PROCESSING;
            return Credentials
                .createFromSecureContent(archiveDetails.credentials, password)
                .then((credentials) => {
                    if (!credentials) {
                        return Promise.reject(new Error("Failed unlocking credentials: " + name));
                    }
                    archiveDetails.credentials = credentials;
                    archiveDetails.password = password;
                    let datasourceInfo = JSON.parse(credentials.getMeta(Credentials.DATASOURCE_META)),
                        ds = DatasourceAdapter.objectToDatasource(datasourceInfo, credentials);
                    if (!ds) {
                        throw new Error("Failed creating datasource - possible corrupt credentials");
                    }
                    return Promise.all([
                        ds.load(password),
                        Promise.resolve(ds)
                    ]);
                })
                .then(([archive, datasource] = []) => {
                    let workspace = new SharedWorkspace();
                    workspace.setPrimaryArchive(archive, datasource, password);
                    archiveDetails.workspace = workspace;
                    archiveDetails.status = ArchiveManager.ArchiveStatus.UNLOCKED;
                });
        }

    }

    ArchiveManager.ArchiveStatus = {
        LOCKED: "locked",
        UNLOCKED: "unlocked",
        PROCESSING: "processing"
    };

    module.exports = ArchiveManager;

})(module);
