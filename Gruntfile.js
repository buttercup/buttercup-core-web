module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({

        jasmine: {
            buttercup_raw: {
                src: "build/buttercup.js",
                options: {
                    specs: "tests/**/*.js"
                }
            },
            buttercup_min: {
                src: "build/buttercup.min.js",
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
