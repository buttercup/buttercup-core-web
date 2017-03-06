describe("Buttercup.vendor", function() {

    "use strict";

    describe("iocane", function() {

        it("derives the correct password", function(done) {
            window.Buttercup.vendor.iocane.derivation.deriveFromPassword("p455", "salt", 30000)
                .then(function(hash) {
                    return hash.key.toString("hex");
                })
                .then(function(hash) {
                    expect(hash).to.equal("3206e36d28a3139def5037d1a0d25b4eb12cd8a70f715517206e7f07f8f8dd2b");
                    (done)();
                })
                .catch(function(err) {
                    console.error(err);
                });
        });

        it("handles a large amount of rounds", function(done) {
            window.Buttercup.vendor.iocane.derivation.deriveFromPassword("some-password", "123salt", 250000)
                .then((hash) => hash.key.toString("hex"))
                .then(function(hash) {
                    expect(hash).to.equal("c6aabb1f7cf5a74f39d74a72e4b5708407de63177deddf86f930dc0197100acd");
                })
                .then(done)
                .catch(function(err) {
                    console.error(err);
                });
        });

    });

});
