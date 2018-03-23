const dev = process.env.NODE_ENV !== "production";
const webpack = require( "webpack" );
const path = require( "path" );
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
];

if ( !dev ) {
    plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new BundleAnalyzerPlugin( {
            analyzerMode: "static",
            reportFilename: "webpack-report.html",
            openAnalyzer: false,
        } ),
    );
}

module.exports = {
    mode: dev ? "development" : "production",
    context: path.join( __dirname, "src" ),
    devtool: dev ? "none" : "source-map",
    entry: {
        app: "./js/App.js",
        lib: [ "react", "react-dom" ],
    },
    resolve: {
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
        ],
    },
    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "js/[name].bundle.js",
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: Infinity,
                    name: "lib",
                    enforce: true,
                },
            },
        },
    },
    plugins,
};
