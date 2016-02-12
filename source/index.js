(function() {

	"use strict";

	window.Buttercup = require("buttercup");

	var ArchiveManager = require("./ArchiveManager.js");

	window.Buttercup.Web = {

		archiveManager: new ArchiveManager()

	};

})();
