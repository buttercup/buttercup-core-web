(function(module) {

    "use strict";

    const subtleCrypto = window.crypto.subtle;

    function addHexSupportToArrayBuffer(arrayBuffer) {
        let _toString = arrayBuffer.toString || function() {};
        arrayBuffer.toString = function(mode) {
            if (mode === "hex") {
                return arrayBufferToHexString(arrayBuffer);
            }
            return _toString.call(arrayBuffer, mode);
        };
        return arrayBuffer;
    }

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

    function checkBrowserSupport() {
        if (!window.TextEncoder || !window.TextDecoder) {
            throw new Error("TextEncoder is not available");
        }
    }

    function joinBuffers(buffer1, buffer2) {
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        return tmp.buffer;
    }

    function stringToArrayBuffer(string) {
        var encoder = new TextEncoder("utf-8");
        return encoder.encode(string);
    }

    var lib = module.exports = {

        /**
         * Derive a key from a password
         * @param {String} password The password
         * @param {String} salt The salt
         * @param {Number} rounds The number of derivation rounds
         * @param {Number} bits The number of bits for the key
         * @see checkBrowserSupport
         */
        deriveKeyFromPassword: function(password, salt, rounds, bits/*, algorithm*/) {
            checkBrowserSupport();

            let params = {
                    "name": "PBKDF2",
                    "hash": "SHA-256",
                    "salt": stringToArrayBuffer(salt),
                    "iterations": rounds
                },
                bytes = bits / 8,
                keysLen = bytes / 2;
            return subtleCrypto.importKey(
                    "raw",
                    stringToArrayBuffer(password),
                    {"name": "PBKDF2"},
                    false, // not extractable
                    ["deriveBits"]
                )
                .then((keyData) => subtleCrypto.deriveBits(params, keyData, bits))
                .then((derivedData) => Promise.all([
                    subtleCrypto.importKey(
                        "raw",
                        derivedData.slice(0, keysLen),
                        "AES-CBC",
                        true,
                        ["encrypt", "decrypt"]
                    ),
                    subtleCrypto.importKey(
                        "raw",
                        derivedData.slice(keysLen, keysLen * 2),
                        "AES-CBC",
                        true,
                        ["encrypt", "decrypt"]
                    )
                ]))
                .then((aesKeys) => Promise.all([
                	subtleCrypto.exportKey("raw", aesKeys[0]),
                    subtleCrypto.exportKey("raw", aesKeys[1])
                ]))
                .then((rawKeys) => joinBuffers(rawKeys[0], rawKeys[1]))
                .then((arrBuff) => addHexSupportToArrayBuffer(arrBuff)); // HAXOR
        },

        /**
         * Perform patching of the PBKDF2 function in iocane
         */
        patchCorePBKDF: function() {
            window.Buttercup.vendor.iocane.components.setPBKDF2(lib.deriveKeyFromPassword);
        }

    };

})(module);
