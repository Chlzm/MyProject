var webpack = require('webpack')
var path = path = require('path')
var rootPath = path.dirname(__dirname)
var banner = 'lastmodify: ' + new Date().toLocaleString();
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    module: {
        noParse: [/moment-with-locales/],
        loaders: [{
            test: /\.(js|jsx)(-lazy)?$/,
            exclude: /node_modules/,
            loader: 'ng-annotate!babel-loader',
            externals: {
                moment: true
            }
        },{
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css?sourceMap!' +'less?sourceMap')
        },{
            test: /\.css$/, loader: 'style-loader!css-loader'
        },{
            test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
        }],
        postLoaders : []
    },
    resolve: {
        extensions: ['','.less', '.js', '.jsx', '.js-lazy', '.jsx-lazy'],
        root: rootPath,
        alias: {
            moment: "moment/min/moment-with-locales.min.js"
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.BannerPlugin(banner, {
            entryOnly: true
        })
    ]
}