"use strict";

module.exports = {

    /**
     * Get entries for a particular URL
     * @param {Archive} archive A buttercup archive instance
     * @param {String} url A URL
     * @return {Array.<Entry>} An array of entries
     */
    getEntriesForURL: function(archive, url) {
        var entries = [];
        ["URL", "url"].forEach(function(metaKey) {
            var newEntries = archive
                .findEntriesByMeta(metaKey, /.+/)
                .filter(function(entry) {
                    var entryURL = entry.getMeta(metaKey);
                    return url.toLowerCase().indexOf(entryURL.toLowerCase()) >= 0 &&
                        entry.isInTrash() === false;
                });
            if (newEntries.length > 0) {
                entries = entries.concat(newEntries);
            }
        });
        return entries;
    }

};
