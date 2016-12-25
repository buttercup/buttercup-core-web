describe("ArchiveManager", function() {

    "use strict";

    var Buttercup = window.Buttercup,
        Archive = Buttercup.Archive,
        Credentials = Buttercup.Credentials,
        TextDatasource = Buttercup.TextDatasource,
        SharedWorkspace = Buttercup.SharedWorkspace,
        ArchiveManager = Buttercup.Web.ArchiveManager;

    
    beforeEach(function() {
        this.archiveManager = new ArchiveManager({
            getData: () => JSON.parse(this.savedData),
            setData: (name, data) => {
                this.savedData = JSON.stringify(data)
            }
        });
        this.savedData = `{ "archives": {} }`;
        let testArchive = Archive.createWithDefaults(),
            testDatasource = new TextDatasource();
        return testDatasource
            .save(testArchive, "pass")
            .then((archiveEnc) => {
                this.datasource = new TextDatasource(archiveEnc);
                this.workspace = new SharedWorkspace();
                this.workspace.setPrimaryArchive(testArchive, this.datasource, "pass");
                let creds = new Credentials();
                creds.setMeta(Credentials.DATASOURCE_META, this.datasource.toString());
                this.archiveManager.addArchive(
                    "test",
                    this.workspace,
                    creds,
                    "pass"
                );
            });
    });

    describe("isLocked", function() {

        it("detects unlocked entries correctly", function() {
            expect(this.archiveManager.isLocked("test")).to.be.false;
        });

        it("detects locked entries correctly", function() {
            this.archiveManager.archives["test"].status = ArchiveManager.ArchiveStatus.LOCKED;
            expect(this.archiveManager.isLocked("test")).to.be.true;
        });

    });

    describe("loadState", function() {

        it("loads saved archives in locked state", function() {
            expect(this.archiveManager.archives["test"].status).to.equal(ArchiveManager.ArchiveStatus.UNLOCKED);
            return this.archiveManager
                .saveState()
                .then(() => this.archiveManager.loadState())
                .then(() => {
                    expect(this.archiveManager.archives["test"].status).to.equal(ArchiveManager.ArchiveStatus.LOCKED);
                });
        });

    });

    describe("lock", function() {

        it("locks an item successfully", function() {
            expect(this.archiveManager.archives["test"].status).to.equal(ArchiveManager.ArchiveStatus.UNLOCKED);
            return this.archiveManager
                .lock("test")
                .then(() => {
                    let details = this.archiveManager.archives["test"];
                    expect(details.status).to.equal(ArchiveManager.ArchiveStatus.LOCKED);
                    expect(details.workspace).to.be.undefined;
                    expect(details.password).to.be.undefined;
                    expect(typeof details.credentials).to.equal("string");
                });
        });

    });

    describe("saveState", function() {

        it("writes archives to storage", function() {
            return this.archiveManager
                .saveState()
                .then(() => {
                    let storage = JSON.parse(this.savedData);
                    expect(storage.archives.test).to.have.length.above(50);
                });
        });

    });

    describe("unlock", function() {

        it("unlocks a locked item", function() {
            return this.archiveManager
                .lock("test")
                .then(() => {
                    expect(this.archiveManager.archives["test"].status).to.equal(ArchiveManager.ArchiveStatus.LOCKED);
                    return this.archiveManager.unlock("test", "pass");
                })
                .then(() => {
                    expect(this.archiveManager.archives["test"].status).to.equal(ArchiveManager.ArchiveStatus.UNLOCKED);
                });
        });

    });

});
