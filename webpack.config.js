/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var root_dir = path.resolve(__dirname);
var phaser_modules = path.join(
    root_dir,
    'node_modules',
    'phaser-ce',
    'build',
    'custom',
);

var paths = {
    static: path.join(root_dir, 'static'),
    source: path.join(root_dir, 'src'),
    content: path.join(root_dir, 'dist'),
    pixi: path.join(phaser_modules, 'pixi.js'),
    phaser: path.join(phaser_modules, 'phaser-arcade-physics.js'),
    // NOTE:
    // maybe if we define the path to the rot.js lib here, and use the "expose-loader" for it as well?
};

module.exports = {
    entry: {
        main: path.join(paths.source, 'main.js'),
    },

    output: {
        path: paths.content,
        filename: '[name].min.js',
        sourceMapFilename: '[name].js.map',
    },

    devtool: 'source-map',

    resolve: {
        alias: {
            pixi: paths.pixi,
            phaser: paths.phaser,
        },
    },

    module: {
        rules: [
            // exposing pixi and correct phaser into global scope
            {
                test: paths.pixi,
                use: {
                    loader: 'expose-loader',
                    options: 'PIXI',
                },
            },
            {
                test: paths.phaser,
                use: {
                    loader: 'expose-loader',
                    options: 'Phaser',
                },
            },
            // pass rest of source through babel
            {
                test: /\.js$/,
                include: path.join(paths.source),
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env'],
                },
            },
        ],
    },

    devServer: {
        contentBase: paths.content,
        publicPath: '/',
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new CopyWebpackPlugin([
            {
                from: path.join(paths.static),
                to: path.join(paths.content),
            },
        ]),
        // injects the correct `<script/>` tag into our `index.html`
        new HtmlWebpackPlugin({
            template: path.resolve(paths.source, 'index.html'),
            filename: 'index.html',
        }),
    ],
};
