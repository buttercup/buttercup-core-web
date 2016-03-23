(function() {

	"use strict";

	window.Buttercup = require("buttercup");

	var ArchiveManager = require("__buttercup_web/ArchiveManager.js"),
        ArchiveTools = require("__buttercup_web/ArchiveTools.js");

	window.Buttercup.Web = {

		ArchiveManager: ArchiveManager,

		archiveManager: new ArchiveManager(),

        ArchiveTools: ArchiveTools

	};

})();
