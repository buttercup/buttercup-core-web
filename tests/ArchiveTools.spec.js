describe("ArchiveManager", function() {

    "use strict";

    var Buttercup = window.Buttercup;

    var ButtercupWeb = window.Buttercup.Web,
        ArchiveTools = ButtercupWeb.ArchiveTools;

    describe("extractDomain", function() {

        it("extracts from full URLs", function() {
            expect(ArchiveTools.extractDomain(
                "http://www.example.com/test-area/index.html"
            )).to.equal("www.example.com");
            expect(ArchiveTools.extractDomain(
                "sub1.example.website.com/test-area/index.php?abc"
            )).to.equal("sub1.example.website.com");
            expect(ArchiveTools.extractDomain(
                "https://abc.cn"
            )).to.equal("abc.cn");
        });

        it("extracts from domains only", function() {
            expect(ArchiveTools.extractDomain("www.site.com.au")).to.equal("www.site.com.au");
            expect(ArchiveTools.extractDomain("example.org")).to.equal("example.org");
        });

    });

    describe("getEntriesForURL", function() {

        var archive;

        beforeEach(function() {
            archive = new Buttercup.Archive();
            var group1 = archive.createGroup("Group 1"),
                group2 = archive.createGroup("Group 2");
            var entry1 = group1.createEntry("Entry 1"),
                entry2 = group2.createEntry("Entry 2"),
                entry3 = group1.createEntry("Entry 3"),
                entry4 = group2.createEntry("Entry 3");
            entry1.setProperty("username", "entry1");
            entry1.setMeta("URL", "http://www.example.com/test-area/index.html");
            entry2.setProperty("username", "entry2");
            entry2.setMeta("URL", "www.example.com/test-area/");
            entry3.setProperty("username", "entry3");
            entry3.setMeta("URL", "https://login.amazing.com/entry-portal");
            entry4.setProperty("username", "entry4");
            entry4.setMeta("URL", "invalid");
        });

        it("fetches similar URLs", function() {
            var currentURL = "http://www.example.com/test-area/index.html#testing",
                entries = ArchiveTools.getEntriesForURL(archive, currentURL);
            expect(entries.length).to.equal(2);
        });

        it("fetches a single URL", function() {
            var currentURL = "https://login.amazing.com/entry-portal",
                entries = ArchiveTools.getEntriesForURL(archive, currentURL);
            expect(entries.length).to.equal(1);
            expect(entries[0].getProperty("username")).to.equal("entry3");
        });

        it("ignores empty/non-matching URLs", function() {
            var currentURL = "invalid",
                entries = ArchiveTools.getEntriesForURL(archive, currentURL);
            expect(entries.length).to.equal(0);
        });

    });

});
