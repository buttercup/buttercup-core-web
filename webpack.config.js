var path              = require("path"),
	webpack           = require("webpack");

const paths = [
    path.resolve('./source'),
    /buttercup/
];

const entry = path.resolve(__dirname, "./source/index.js");
const loaders = [
    {
        test: /\.json$/i,
        loader: "json-loader"
    },
    {
        test: /\.js$/,
        loader: "babel"
    }
];
const node = {
    crypto: false,
    fs: "empty"
};
const resolve = {
    alias: {
        crypto:             require.resolve("crypto-browserify"),
        __buttercup_web:    path.resolve(__dirname, './source')
    },
    fallback: [ path.join(__dirname, 'node_modules') ]
};
const stats = { colors: true };

module.exports = [
    {
        entry,
        module: { loaders },
        node,
        output: {
            path:       path.resolve(__dirname, "./build"),
            filename:   "buttercup.js"
        },
        resolve,
        stats
    },
    {
        entry,
        module: { loaders },
        node,
        output: {
            path:       path.resolve(__dirname, "./build"),
            filename:   "buttercup.min.js"
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ],
        resolve,
        stats
    }
];
