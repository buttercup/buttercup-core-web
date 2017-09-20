const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const Visualizer = require("webpack-visualizer-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

// const defines = {
//     "global.GENTLY": false
// };

const SOURCE = path.resolve(__dirname, "./source");
const DIST = path.resolve(__dirname, "./dist");
const NODE_MODULES = path.resolve(__dirname, "./node_modules");
const BUTTERCUP_CORE = fs.realpathSync(path.resolve(NODE_MODULES, "./buttercup"));
const IOCANE = fs.realpathSync(path.resolve(NODE_MODULES, "./iocane"));
const WEBDAVFS = fs.realpathSync(path.resolve(NODE_MODULES, "./webdav-fs"));

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
            IOCANE,
            WEBDAVFS
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
    modules: [ NODE_MODULES, BUTTERCUP_CORE, IOCANE, WEBDAVFS ]
};
const resolveRN = Object.assign({}, resolve);
resolveRN.alias.dropbox = "react-native-dropbox-sdk";
const stats = { colors: true };
const developmentPlugins = process.env.VIS === "stats" ?
    [ new Visualizer() ] : [];

module.exports = [

    // Raw
    {
        entry,
        module: { rules },
        node,
        output: {
            path: DIST,
            filename: "buttercup.js",
            library: "Buttercup",
            libraryTarget: "umd"
        },
        plugins: [
            // new webpack.DefinePlugin(defines),
            new LodashModuleReplacementPlugin(),
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, "node-noop"),
            new webpack.IgnorePlugin(/vertx/),
            ...developmentPlugins
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
            path: DIST,
            filename: "buttercup.min.js",
            library: "Buttercup",
            libraryTarget: "umd"
        },
        plugins: [
            // new webpack.DefinePlugin(defines),
            new LodashModuleReplacementPlugin(),
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
    },

    // Minified + React-Native compat
    {
        entry,
        module: { rules },
        node,
        output: {
            path: DIST,
            filename: "react-native-buttercup.min.js",
            library: "Buttercup",
            libraryTarget: "umd"
        },
        plugins: [
            // new webpack.DefinePlugin(defines),
            new LodashModuleReplacementPlugin(),
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
        resolve: resolveRN,
        stats
    }

];
