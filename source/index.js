(function() {

	"use strict";

	window.Buttercup = require("buttercup");

	var ArchiveManager = require("__buttercup_web/ArchiveManager.js");

	window.Buttercup.Web = {

		archiveManager: new ArchiveManager()

	};

})();
