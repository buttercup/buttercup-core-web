"use strict";

/**
 * @name StorageInterface
 * @type {Object}
 */
module.exports = {

    /**
     * Get data from storage
     * @memberof StorageInterface
     * @name getData
     * @static
     * @param {String} key The key to fetch for
     * @param {*} defaultValue The default value if the key is not found
     * @returns {*} The fetched data
     */
    getData: function(key, defaultValue) {
        var value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    },

    /**
     * Set data for a key
     * @memberof StorageInterface
     * @name setData
     * @static
     * @param {String} key The key to set for
     * @param {Object|Array|String|Number|*} rawData The raw data to set
     */
    setData: function(key, rawData) {
        window.localStorage.setItem(key, JSON.stringify(rawData));
    }

};
