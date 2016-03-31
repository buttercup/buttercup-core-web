describe("ArchiveManager", function() {

    "use strict";

    var Buttercup = window.Buttercup;

    var ButtercupWeb = window.Buttercup.Web,
        ArchiveTools = ButtercupWeb.ArchiveTools;

    describe("getEntriesForURL", function() {

        var archive;

        beforeEach(function() {
            archive = new Buttercup.Archive();
            var group1 = archive.createGroup("Group 1"),
                group2 = archive.createGroup("Group 2");
            var entry1 = group1.createEntry("Entry 1"),
                entry2 = group2.createEntry("Entry 2"),
                entry3 = group1.createEntry("Entry 3");
            entry1.setProperty("username", "entry1");
            entry1.setMeta("URL", "http://www.example.com/test-area/index.html");
            entry2.setProperty("username", "entry2");
            entry2.setMeta("URL", "example.com/test-area/");
            entry3.setProperty("username", "entry3");
            entry3.setMeta("URL", "https://login.amazing.com/entry-portal");
        });

        it("fetches similar URLs", function() {
            var currentURL = "http://www.example.com/test-area/index.html#testing",
                entries = ArchiveTools.getEntriesForURL(archive, currentURL);
            expect(entries.length).toBe(2);
        });

        it("fetches a single URL", function() {
            var currentURL = "https://login.amazing.com/entry-portal",
                entries = ArchiveTools.getEntriesForURL(archive, currentURL);
            expect(entries.length).toBe(1);
            expect(entries[0].getProperty("username")).toBe("entry3");
        });

    });

});
