"use strict";

window.Buttercup = require("buttercup");

const ArchiveManager = require("__buttercup_web/ArchiveManager.js");
const ArchiveTools = require("__buttercup_web/ArchiveTools.js");
const HashingTools = require("__buttercup_web/HashingTools.js");
const StorageInterface = require("__buttercup_web/StorageInterface.js");
const DropboxDatasource = require("__buttercup_web/DropboxDatasource.js");

// BEGIN initialisation

HashingTools.patchCorePBKDF();

let sessionArchiveManager = new ArchiveManager();
sessionArchiveManager.loadState();

// END initialisation

// Export:

window.Buttercup.Web = {

    ArchiveManager,

    archiveManager: sessionArchiveManager,

    ArchiveTools,

    DropboxDatasource,

    HashingTools,

    StorageInterface

};
