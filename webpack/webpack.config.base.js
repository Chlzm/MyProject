var webpack = require('webpack')
var path = path = require('path')
var rootPath = path.dirname(__dirname)
var banner = 'lastmodify: ' + new Date().toLocaleString()

module.exports = {
    module: {
        loaders: [{
            test: /\.(js|jsx)(-lazy)?$/,
            exclude: /node_modules/,
            loader: 'ng-annotate!babel-loader'
        },{
            test: /\.less$/, loader: 'style-loader!css-loader!less-loader'
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
        alias: {}
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.BannerPlugin(banner, {
            entryOnly: true
        })
    ]
}