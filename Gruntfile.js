module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({

        jasmine: {
            buttercup: {
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
        "jasmine:buttercup"
    ]);

};
