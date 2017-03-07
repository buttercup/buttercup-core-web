describe("ArchiveManager", function() {

    var Buttercup = window.Buttercup,
        Archive = Buttercup.Archive,
        createCredentials = Buttercup.createCredentials,
        TextDatasource = Buttercup.TextDatasource,
        Workspace = Buttercup.Workspace,
        ArchiveManager = Buttercup.Web.ArchiveManager;

    beforeEach(function() {
        this.archiveManager = new ArchiveManager({
            getData: () => JSON.parse(this.savedData),
            setData: (name, data) => {
                this.savedData = JSON.stringify(data);
            }
        });
        this.savedData = '{ "archives": {} }';
        let testArchive = Archive.createWithDefaults(),
            testDatasource = new TextDatasource();
        return testDatasource
            .save(testArchive, createCredentials.fromPassword("pass"))
            .then((archiveEnc) => {
                this.datasource = new TextDatasource(archiveEnc);
                this.workspace = new Workspace();
                this.workspace.setPrimaryArchive(testArchive, this.datasource, createCredentials.fromPassword("pass"));
                let creds = createCredentials("text");
                creds.setValue("datasource", this.datasource.toString());
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
                    expect(this.archiveManager.archives.test.status).to.equal(ArchiveManager.ArchiveStatus.LOCKED);
                    expect(this.archiveManager.archives.test.type).to.equal("text");
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

    describe("removeArchive", function() {

        it("removes the archive", function() {
            let removed = this.archiveManager.removeArchive("test");
            expect(removed).to.be.true;
            expect(this.archiveManager.archives.test).to.be.undefined;
        });

    });

    describe("saveState", function() {

        it("writes archives to storage", function() {
            return this.archiveManager
                .saveState()
                .then(() => {
                    let storage = JSON.parse(this.savedData);
                    expect(storage.archives.test.content).to.have.length.above(50);
                });
        });

        it("saves type", function() {
            return this.archiveManager
                .saveState()
                .then(() => {
                    let storage = JSON.parse(this.savedData);
                    expect(storage.archives.test.type).to.equal("text");
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
