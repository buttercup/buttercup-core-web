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

        /**
         * Constructor for the manager
         * @param {StorageInterface=} storage Storage interface reference
         */
        constructor(storage) {
            this._archives = {};
            this._storage = storage || StorageInterface;
        }

        /**
         * Archives reference
         * @type {Object}
         */
        get archives() {
            return this._archives;
        }

        /**
         * Archive details for display
         * @typedef {Object} ArchiveDetailsDisplay
         * @property {String} name The name of the item
         * @property {ArchiveStatus} status The status of the item
         */

        /**
         * Array of archive details ready for display
         * @type {Array.<ArchiveDetailsDisplay>}
         */
        get displayList() {
            let archives = this.archives;
            return Object.keys(archives).map(name => ({
                name,
                status: archives[name].status
            }));
        }

        /**
         * Storage reference
         * @type {StorageInterface}
         */
        get storage() {
            return this._storage;
        }

        /**
         * Stored archive entry
         * @typedef {Object} ManagedArchiveItem
         * @property {ArchiveStatus} status The status of the item
         * @property {SharedWorkspace|undefined} workspace Reference to the workspace (undefined if locked)
         * @property {Credentials|String} credentials Reference to Credentials instance (encrypted string if locked)
         * @property {String|undefined} password The master password (undefined if locked)
         */

        /**
         * Array of unlocked archive items
         * @type {Array.<ManagedArchiveItem>}
         */
        get unlockedArchives() {
            let archives = this.archives;
            return Object.keys(archives)
                .map(name => Object.assign({ name }, archives[name]))
                .filter(details => details.status === ArchiveManager.ArchiveStatus.UNLOCKED);
        }

        /**
         * Add an archive to the manager
         * @param {String} name A unique name for the item
         * @param {SharedWorkspace} workspace The workspace that holds the archive, datasource etc.
         * @param {Credentials} credentials The credentials for remote storage etc.
         *  (these should also already hold datasource meta information)
         * @param {String} masterPassword The master password
         */
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

        /**
         * Check if an item is locked
         * @param {String} name The name of the item
         * @returns {Boolean} True if locked
         * @throws {Error} Throws if the item is not found
         */
        isLocked(name) {
            if (!this._archives[name]) {
                throw new Error(`Archive not found: ${name}`);
            }
            return this._archives[name].status === ArchiveManager.ArchiveStatus.LOCKED;
        }

        /**
         * Load the manager state
         * Used when the page loads to restore the archive items list (all are locked at
         *  this stage).
         * 
         */
        loadState() {
            this._archives = {};
            var loadedData = this.storage.getData("archiveManager", { archives: {} });
            for (var name in loadedData.archives) {
                this._archives[name] = {
                    status: ArchiveManager.ArchiveStatus.LOCKED,
                    credentials: loadedData.archives[name]
                };
            }
        }

        /**
         * Lock an item
         * @param {String} name The name of the item to lock
         * @throws {Error} Throws if the item is not found
         * @throws {Error} Throws if the item is already locked
         * @throws {Error} Throws if the item is currently being processed
         * @returns {Promise} A promise that resolves when the item is locked
         */
        lock(name) {
            if (!this._archives[name]) {
                throw new Error(`Archive not found: ${name}`);
            }
            if (this.isLocked(name)) {
                throw new Error(`Archive already locked: ${name}`);
            }
            let details = this._archives[name];
            if (details.status === ArchiveManager.ArchiveStatus.PROCESSING) {
                throw new Error(`Archive is in processing state: ${name}`);
            }
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

        /**
         * Save the state of the manager to the storage
         * @returns {Promise} A promise that resolves once the state has been saved
         */
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
                .then(() => {
                    this.storage.setData("archiveManager", packet);
                });
        }

        /**
         * Unlock a locked item
         * @param {String} name The name of the item to unlock
         * @param {String} password The master password of the item to unlock
         * @throws {Error} Throws if the item is not locked
         * @returns {Promise} A promise that resolves when the item is unlocked
         */
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

    /**
     * Stored archive status
     * @name ArchiveStatus
     * @enum
     * @memberof ArchiveManager
     */
    ArchiveManager.ArchiveStatus = {
        LOCKED: "locked",
        UNLOCKED: "unlocked",
        PROCESSING: "processing"
    };

    module.exports = ArchiveManager;

})(module);
