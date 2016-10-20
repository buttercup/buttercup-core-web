var path              = require("path"),
	webpack           = require("webpack");

const paths = [
    path.resolve('./source'),
    /buttercup/
];

module.exports = {

    entry: path.resolve(__dirname, "./source/index.js"),

    module: {
        loaders: [
            {
                test: /\.json$/i,
                loader: "json-loader"
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    },

    node: {
        crypto: false,
        fs: "empty"
    },

    output: {
        path: path.resolve(__dirname, "./build"),
		filename: "buttercup.js"
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
