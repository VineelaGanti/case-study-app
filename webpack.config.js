const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client',
        'webpack/hot/only-dev-server',
        './client-entry.js'
    ],
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        chunkFilename: '[id].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                test: /\.scss$/
            },
            {
                use: [
                    'style-loader',
                    'css-loader'
                ],
                test: /\.css$/
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        host: 'localhost',
        hot: true,
        noInfo: false,
        open: true,
        port: 8081,
        publicPath: '/',
        stats: {
            cached: false,
            cachedAssets: false,
            colors: true
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
    ]
};
