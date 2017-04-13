var path              = require("path"),
    fs                = require("fs"),
    webpack           = require("webpack");

const defines = {
    "global.GENTLY": false
};
const entry = path.resolve(__dirname, "./source/index.js");
const loaders = [
    {
        test: /\.json$/i,
        loader: "json-loader"
    },
    {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
            path.resolve(__dirname, "./source"),
            fs.realpathSync(path.resolve(__dirname, "./node_modules/buttercup")),
            path.resolve(__dirname, "./node_modules")
        ],
        query: {
            presets: [
                fs.realpathSync(path.resolve(__dirname, "./node_modules/babel-preset-es2015"))
            ]
        }
    }
];
const node = {
    crypto: false,
    fs: "empty"
};
const resolve = {
    alias: {
        crypto:             require.resolve("crypto-browserify"),
        __buttercup_web:    path.resolve(__dirname, "./source")
    },
    fallback: [ path.join(__dirname, "node_modules") ],
    modulesDirectories: [ path.join(__dirname, "node_modules") ]
};
const stats = { colors: true };

module.exports = [
    {
        entry,
        module: { loaders },
        node,
        output: {
            path:           path.resolve(__dirname, "./build"),
            filename:       "buttercup.js",
            library:        "Buttercup",
            libraryTarget:  "umd"
        },
        plugins: [
            new webpack.DefinePlugin(defines),
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, "node-noop"),
            new webpack.IgnorePlugin(/vertx/)
        ],
        resolve,
        resolveLoader: {
            fallback: [ path.join(__dirname, "node_modules") ]
        },
        stats
    },
    {
        entry,
        module: { loaders },
        node,
        output: {
            path:           path.resolve(__dirname, "./build"),
            filename:       "buttercup.min.js",
            library:        "Buttercup",
            libraryTarget:  "umd"
        },
        plugins: [
            new webpack.DefinePlugin(defines),
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, "node-noop"),
            new webpack.IgnorePlugin(/vertx/),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ],
        resolve,
        resolveLoader: {
            fallback: [ path.join(__dirname, "node_modules") ]
        },
        stats
    }
];
