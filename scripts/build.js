(function() {

    "use strict";

    var path = require("path"),
        childProc = require("child_process");

    var root = path.resolve(__dirname + "/..");

    console.log("Running: browserify...");
    childProc.exec(
        "node node_modules/browserify/bin/cmd.js -e source/index.js -t brfs --insert-globals -o build/buttercup.js",
        {
            cwd: root
        },
        function(err) {
            if (err) {
                throw err;
            }
            console.log("Completed: browserify");
            console.log("Running: uglify...");
            childProc.exec(
                "node node_modules/uglify-js/bin/uglifyjs -v -o build/buttercup.min.js -- build/buttercup.js",
                {
                    cwd: root
                },
                function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log("Completed: uglify");
                }
            );
        }
    );

})();
