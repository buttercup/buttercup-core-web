"use strict";

/**
 * @namespace ArchiveTools
 */
const tools = module.exports = {

    /**
     * Extract the domain from a URL
     * @param {String} url The URL to extract from
     * @returns {String} The domain or an empty string if none found
     * @memberof ArchiveTools
     */
    extractDomain: function(url) {
        let match = url.match(/^(https?:\/\/)?([a-z0-9-]+\.[a-z0-9-]+(\.[a-z0-9-]+)*)/i);
        return match ?
            match[2] :
            "";
    },

    /**
     * Get entries for a particular URL
     * @param {Archive} archive A buttercup archive instance
     * @param {String} url A URL
     * @return {Array.<Entry>} An array of entries
     * @memberof ArchiveTools
     */
    getEntriesForURL: function(archive, url) {
        return archive
            .findEntriesByMeta("url", /.+/)
            .filter(function(entry) {
                var entryURL = entry.getMeta("url"),
                    entryDomain = tools.extractDomain(entryURL);
                return entryDomain.length > 0 &&
                    entryDomain === tools.extractDomain(url) &&
                    entry.isInTrash() === false;
            });
    }

};
