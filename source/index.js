(function() {

	"use strict";

	window.Buttercup = require("buttercup");

	var ArchiveManager = require("__buttercup_web/ArchiveManager.js"),
        ArchiveTools = require("__buttercup_web/ArchiveTools.js"),
        HashingTools = require("__buttercup_web/HashingTools.js"),
        StorageInterface = require("__buttercup_web/StorageInterface.js"),
        DropboxDatasource = require("__buttercup_web/DropboxDatasource.js");

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

})();
