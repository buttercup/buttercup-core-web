"use strict";

const Buttercup = require("buttercup");

const ArchiveTools = require("__buttercup_web/ArchiveTools.js");
const EntryFinder = require("__buttercup_web/EntryFinder.js");
const HashingTools = require("__buttercup_web/HashingTools.js");
const DropboxDatasource = require("__buttercup_web/DropboxDatasource.js");

module.exports = Object.assign(
    {},
    Buttercup,
    {
        Web: {
            ArchiveTools,
            DropboxDatasource,
            EntryFinder,
            HashingTools
        }
    }
);
