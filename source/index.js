"use strict";

const Buttercup = require("buttercup");

const ArchiveManager = require("__buttercup_web/ArchiveManager.js");
const ArchiveTools = require("__buttercup_web/ArchiveTools.js");
const EntryFinder = require("__buttercup_web/EntryFinder.js");
const HashingTools = require("__buttercup_web/HashingTools.js");
const StorageInterface = require("__buttercup_web/StorageInterface.js");
const DropboxDatasource = require("__buttercup_web/DropboxDatasource.js");

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
            StorageInterface
        }
    }
);
