const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js',
        './src/index.scss'
    ],
    output: {
        path: __dirname + "/www/dist",
        filename: 'index.js',
        publicPath: "./",
        assetModuleFilename: '[path][name].[ext]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|woff|eot|ttf|svg)$/,
                type: 'asset/resource',
            }
        ]
    },
    watchOptions: {
        ignored: [
            '/node_modules/',
            '/test/'
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: [
                'www/index.html',
            ],
            server: {
                baseDir: 'www',
                middleware: [
                    (req, res, next) => (-1 === req.url.indexOf('.') && '/' !== req.url
                        ? res.end(res.writeHead(302, { Location: '/' }))
                        : next()),
                ]
            },
        })
    ]
};