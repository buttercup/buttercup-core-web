module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({

        exec: {
            browserify: {
                //cmd: 'NODE_PATH=node_modules/buttercup/source node node_modules/browserify/bin/cmd.js -e node_modules/buttercup/source/module.js --insert-globals -o build/buttercup.js'
                cmd: 'node node_modules/browserify/bin/cmd.js -e source/index.js --ignore curlrequest -t brfs --insert-globals -o build/buttercup.js'
            }
        },

        jasmine: {
            buttercup: {
                src: "build/buttercup.min.js",
                options: {
                    specs: "tests/**/*.js"
                }
            }
        },

        uglify: {
            buttercup: {
                files: {
                    "build/buttercup.min.js": ["build/buttercup.js"]
                }
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask("default", ["build"]);

    grunt.registerTask("build", [
        "exec:browserify",
        "uglify:buttercup"
    ]);

};
