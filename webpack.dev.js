/**
 * @file This file contains the Webpack configuration for the development environment.
 * @description Webpack is used to bundle project assets. This configuration is optimized
 * for speed and ease of debugging during development.
 */

// Node.js 'path' module provides utilities for working with file and directory paths.
const path = require('path');
// Webpack is the primary module bundler.
const webpack = require('webpack');
// This plugin simplifies creation of HTML files to serve your webpack bundles.
const HtmlWebPackPlugin = require('html-webpack-plugin');
// This plugin removes/cleans your build folder(s) before building.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // The entry point of the application. Webpack will start bundling from this file.
    entry: './src/client/index.js',
    // Sets the mode to development, which enables features like better debugging.
    mode: 'development',
    // Provides a source map to make debugging easier by mapping bundled code to original source.
    devtool: 'source-map',
    // Controls how Webpack outputs build information to the console.
    stats: 'verbose',
    // This section defines how different types of modules within a project will be treated.
    module: {
        rules: [
            {
                // This rule tests for any files ending in .js.
                test: /\.js$/,
                // It excludes the node_modules directory from being processed by Babel.
                exclude: /node_modules/,
                // It uses babel-loader to transpile modern JavaScript (ES6+) into backward-compatible code.
                loader: 'babel-loader'
            },
            {
                // This rule tests for any files ending in .scss.
                test: /\.scss$/,
                // The 'use' array specifies a chain of loaders to be applied.
                // Loaders are applied from right to left:
                // 1. sass-loader: Compiles Sass to CSS.
                // 2. css-loader: Resolves CSS @import and url() paths.
                // 3. style-loader: Injects the CSS into the DOM by creating <style> nodes.
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    // The plugins array is used to add plugins that extend Webpack's functionality.
    plugins: [
        new HtmlWebPackPlugin({
            // Specifies the source HTML file to use as a template.
            template: './src/client/views/index.html',
            // Specifies the name of the output HTML file that will be generated in the 'dist' folder.
            filename: './index.html',
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
};