(function(module) {

    "use strict";

    var StorageInterface = {

        getData: function(key, defaultValue) {
            var value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        },

        setData: function(key, rawData) {
            window.localStorage.setItem(key, JSON.stringify(rawData));
        }

    };

})(module);
