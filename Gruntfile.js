module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({

        jasmine: {
            buttercup_raw: {
                src: [
                    "node_modules/es6-promise/dist/es6-promise.min.js",
                    "node_modules/text-encoding/lib/encoding.js",
                    "build/buttercup.js"
                ],
                options: {
                    specs: "tests/**/*.js"
                }
            },
            buttercup_min: {
                src: [
                    "node_modules/es6-promise/dist/es6-promise.min.js",
                    "node_modules/text-encoding/lib/encoding.js",
                    "build/buttercup.min.js"
                ],
                options: {
                    specs: "tests/**/*.js"
                }
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask("default", ["test"]);

    grunt.registerTask("test", [
        "jasmine:buttercup_raw",
        "jasmine:buttercup_min"
    ]);

};
