"use strict";

describe("LocalStorageInterface", function() {

    const { LocalStorageInterface } = window.Buttercup.Web;

    beforeEach(function() {
        this.lsi = new LocalStorageInterface();
        this.storage = {
            values: {},
            getItem: key => typeof this.storage.values[key] === "string" ? this.storage.values[key] : null,
            setItem: (key, value) => {
                this.storage.values[key] = value;
            }
        };
        this.lsi._storage = this.storage;
    });

    describe("getAllKeys", function() {

        beforeEach(function() {
            this.storage.values["some key"] = "test";
            this.storage.values.key2 = "another value";
            this.lsi._storage = this.storage.values;
        });

        it("returns all keys", function() {
            return this.lsi.getAllKeys().then(keys => {
                expect(keys).to.contain("some key");
                expect(keys).to.contain("key2");
                expect(keys).to.have.lengthOf(2);
            });
        });

    });

    describe("getValue", function() {

        beforeEach(function() {
            this.storage.values["magicValue"] = "test";
        });

        it("returns the correct value", function() {
            return this.lsi.getValue("magicValue").then(function(value) {
                expect(value).to.equal("test");
            });
        });

        it("returns null if no value found", function() {
            return this.lsi.getValue("magicValue2").then(function(value) {
                expect(value).to.be.null;
            });
        });

    });

    describe("setValue", function() {

        beforeEach(function() {
            this.storage.values["magicValue"] = "test";
        });

        it("sets new values", function() {
            return this.lsi.setValue("item", "1 2 3").then(() => {
                expect(this.storage.values.item).to.equal("1 2 3");
            });
        });

        it("overwrites existing values", function() {
            return this.lsi.setValue("magicValue", "[true]").then(() => {
                expect(this.storage.values.magicValue).to.equal("[true]");
            });
        });

    });

});
