(function(module) {

    "use strict";

    function arrayBufferToHexString(arrayBuffer) {
        var byteArray = new Uint8Array(arrayBuffer);
        var hexString = "";
        var nextHexByte;

        for (var i = 0; i < byteArray.byteLength; i += 1) {
            nextHexByte = byteArray[i].toString(16);
            if (nextHexByte.length < 2) {
                nextHexByte = "0" + nextHexByte;
            }
            hexString += nextHexByte;
        }
        return hexString;
    }

    function stringToArrayBuffer(string) {
        var encoder = new TextEncoder("utf-8");
        return encoder.encode(string);
    }

    var lib = module.exports = {

        deriveKeyFromPassword: function(password, salt, rounds, bits/*, algorithm*/) {
            if (!window.TextEncoder || !window.TextDecoder) {
                throw new Error("TextEncoder is not available");
            }
            return window.crypto.subtle.importKey(
                   "raw",
                   stringToArrayBuffer("passw0rd"),
                   {"name": "PBKDF2"},
                   false,
                   ["deriveKey"]
               )
               .then(function(baseKey) {
                   return window.crypto.subtle.deriveKey(
                        {
                            "name": "PBKDF2",
                            "salt": stringToArrayBuffer(salt),
                            "iterations": rounds,
                            "hash": "SHA-256"
                        },
                        baseKey,
                        {"name": "AES-CBC", "length": bits},
                        true,
                        ["encrypt", "decrypt"]
                    );
               })
               .then(function(aesKey) {
                   return window.crypto.subtle.exportKey("raw", aesKey);
               });
            //    .then(function(keyBytes) {
            //        return arrayBufferToHexString(keyBytes);
            //    })
        },

        patchCorePBKDF: function() {
            window.Buttercup.vendor.iocane.components.setPBKDF2(lib.deriveKeyFromPassword);
        }

    };

})(module);
