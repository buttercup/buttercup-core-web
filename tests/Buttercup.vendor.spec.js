describe("Buttercup.vendor", function() {

	"use strict";

	describe("iocane", function() {

        it("derives the correct password", function(done) {
            window.Buttercup.vendor.iocane.derivation.deriveFromPassword("p455", "salt", 30000)
                .then(function(hash) {
                    return hash.key.toString("hex");
                })
                .then(function(hash) {
                    expect(hash).toBe("3206e36d28a3139def5037d1a0d25b4eb12cd8a70f715517206e7f07f8f8dd2b");
                    (done)();
                })
                .catch(function(err) {
                    console.error(err);
                });
        });

    });

});
