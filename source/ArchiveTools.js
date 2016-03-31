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
                        return (url.toLowerCase().indexOf(entryURL.toLowerCase()) >= 0);
                    });
                if (newEntries.length > 0) {
                    entries = entries.concat(newEntries);
                }
            });
            return entries;
        }

    };

})(module);
