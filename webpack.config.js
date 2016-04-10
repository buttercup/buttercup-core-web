var path              = require("path"),
	webpack           = require("webpack");

module.exports = {

    entry: [
        path.resolve(__dirname, "./source/index.js")
    ],

    module: {
        loaders: [
            {
                test: /\.json$/i,
                loader: "json-loader"
            },
            {
                test: /\.js$/,
                //exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    node: {
        crypto: false,
        fs: "empty"
    },

    output: {
        path: __dirname,
		filename: "./build/buttercup.js"
    },

    resolve: {
        alias: {
            crypto: require.resolve("crypto-browserify"),
			__buttercup_web: path.resolve(__dirname, './source')
        },
        fallback: [path.join(__dirname, 'node_modules')]
    },

    stats: {
		colors: true
	}

};

// var raw = Object.assign({}, template),
//     min = Object.assign({}, template);
//
// min.output.filename = min.output.filename.replace(".js", ".min.js");
// min.plugins = [
//     new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false
//         }
//     }),
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.AggressiveMergingPlugin(),
//     new webpack.optimize.OccurenceOrderPlugin()
// ];
//
// module.exports = [raw, min];
