const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: "./src/main.js",
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/assets/',
        filename: "fryte.min.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    optimization: {
        minimize: true,
    },
    devServer: {
        contentBase: path.join(__dirname, 'example'),
        compress: true,
        inline: true,
    },
};
