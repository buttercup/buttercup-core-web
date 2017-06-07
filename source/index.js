"use strict";

const Buttercup = require("buttercup");

const ArchiveTools = require("__buttercup_web/ArchiveTools.js");
const EntryFinder = require("__buttercup_web/EntryFinder.js");
const HashingTools = require("__buttercup_web/HashingTools.js");
const DropboxDatasource = require("__buttercup_web/DropboxDatasource.js");
const LocalStorageInterface = require("__buttercup_web/LocalStorageInterface.js");

// Deprecated:
const ArchiveManager = require("__buttercup_web/ArchiveManager.js");
const StorageInterface = require("__buttercup_web/StorageInterface.js");

module.exports = Object.assign(
    {},
    Buttercup,
    {
        Web: {
            ArchiveManager,
            ArchiveTools,
            DropboxDatasource,
            EntryFinder,
            HashingTools,
            LocalStorageInterface,
            StorageInterface
        }
    }
);
