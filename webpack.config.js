var path = require("path");
var webpack = require('webpack');
var banner = 'lastmodify: ' + new Date().toLocaleString();
module.exports = {
    entry: {
        /*index:'./public/src/js/app/index/index.js',
        register:'./public/src/js/app/register/register.js',
        login:'./public/src/js/app/login/login.js',
        fishing:'./public/src/js/app/fishing/fishing.js'*/
        test:'./public/src/js/app/test/main'
    }, //演示单入口文件
    output: {
        path: path.join(__dirname, './public/dest/js/app'),   //打包输出的路径
        filename: '[name]/[name].min.js',                              //打包后的名字
        publicPath: "/dest/js/app/",                     //html引用路径，在这里是本地地址。
        chunkFilename : 'test/[chunkhash].js'
    },
    module: {
        loaders: [
            /*{
                test: /\.js?$/,
                loader: 'ng-annotate!babel',
                exclude: /node_modules/,
                discardComments: {removeAll: true}
            },*/
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                //loader: 'ng-annotate!babel-loader',
                loader : 'babel-loader',
                discardComments: {removeAll: true}
            }
        ],
    },
    resolve:{
        extensions:['','.js','.json']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.BannerPlugin(banner, {
            entryOnly: true
        })
    ]
};