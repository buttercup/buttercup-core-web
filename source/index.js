(function() {

	"use strict";

	window.Buttercup = require("buttercup");

	var ArchiveManager = require("__buttercup_web/ArchiveManager.js"),
        ArchiveTools = require("__buttercup_web/ArchiveTools.js"),
        HashingTools = require("__buttercup_web/HashingTools.js");

    // BEGIN initialisation

    HashingTools.patchCorePBKDF();

    // END initialisation

    // Export:

	window.Buttercup.Web = {

		ArchiveManager: ArchiveManager,

		archiveManager: new ArchiveManager(),

        ArchiveTools: ArchiveTools,

        HashingTools: HashingTools

	};

})();
