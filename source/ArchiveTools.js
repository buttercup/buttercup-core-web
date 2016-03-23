(function(module) {

    "use strict";

    var lib = module.exports = {

        getEntriesForURL: function(archive, url) {
            var entries = [];
            ["URL", "url"].forEach(function(metaKey) {
                var newEntries = archive.findEntriesByMeta(metaKey, url);
                if (newEntries.length > 0) {
                    entries = entries.concat(newEntries);
                }
            });
            return entries;
        }

    };

})(module);
