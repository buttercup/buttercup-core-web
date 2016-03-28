(function(module) {

    "use strict";

    var lib = module.exports = {

        getEntriesForURL: function(archive, url) {
            var entries = [];
            ["URL", "url"].forEach(function(metaKey) {
                var newEntries = archive
                    .findEntriesByMeta(metaKey, /.+/)
                    .filter(function(entry) {
                        var entryURL = entry.getMeta(metaKey);
                        console.log("ENTRY", entry, entryURL);
                        return (url.toLowerCase().indexOf(entryURL.toLowerCase()));
                    });
                if (newEntries.length > 0) {
                    entries = entries.concat(newEntries);
                }
            });
            return entries;
        }

    };

})(module);
