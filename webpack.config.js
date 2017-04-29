const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

// const defines = {
//     "global.GENTLY": false
// };

const SOURCE = path.resolve(__dirname, "./source");
const BUILD = path.resolve(__dirname, "./build");
const NODE_MODULES = path.resolve(__dirname, "./node_modules");
const BUTTERCUP_CORE = fs.realpathSync(path.resolve(NODE_MODULES, "./buttercup"));
const IOCANE = fs.realpathSync(path.resolve(NODE_MODULES, "./iocane"));

const entry = path.resolve(SOURCE, "./index.js");
const rules = [
    {
        test: /\.json$/i,
        use: "json-loader"
    },
    {
        test: /\.js$/,
        use: "babel-loader",
        include: [
            SOURCE,
            BUTTERCUP_CORE,
            IOCANE
        ]
    }
];
const node = {
    crypto: false,
    fs: "empty"
};
const resolve = {
    alias: {
        crypto: require.resolve("crypto-browserify"),
        __buttercup_web: SOURCE
    },
    extensions: [".js"],
    symlinks: false,
    modules: [ NODE_MODULES, BUTTERCUP_CORE, IOCANE ]
};
const stats = { colors: true };

module.exports = [

    // Raw
    {
        entry,
        module: { rules },
        node,
        output: {
            path: BUILD,
            filename: "buttercup.js",
            library: "Buttercup",
            libraryTarget: "umd"
        },
        plugins: [
            // new webpack.DefinePlugin(defines),
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, "node-noop"),
            new webpack.IgnorePlugin(/vertx/)
        ],
        resolve,
        stats
    },

    // Minified
    {
        entry,
        module: { rules },
        node,
        output: {
            path: BUILD,
            filename: "buttercup.min.js",
            library: "Buttercup",
            libraryTarget: "umd"
        },
        plugins: [
            // new webpack.DefinePlugin(defines),
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, "node-noop"),
            new webpack.IgnorePlugin(/vertx/),
            new UglifyJSPlugin({
                compress: {
                    warnings: false
                },
                mangle: true,
                comments: false
            })
        ],
        resolve,
        stats
    }

];
