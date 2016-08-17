var path = require("path");
var webpack = require('webpack');
var banner = 'lastmodify: ' + new Date().toLocaleString();
module.exports = {
    entry: {
       /*index:'./public/src/js/app/index/index.js',
        
        register:'./public/src/js/app/register/register.js',
        login:'./public/src/js/app/login/login.js',
        fishing:'./public/src/js/app/fishing/fishing.js'*/
        test:'./public/src/js/app/test/main',
        rj : './public/src/js/app/requirejs/index'
    }, //演示单入口文件
    output: {
        path: path.join(__dirname, './public/dest/js/app'),   //打包输出的路径
        filename: '[name]/[name].min.js',                              //打包后的名字
        publicPath: "/dest/js/app/",                     //html引用路径，在这里是本地地址。
        chunkFilename : 'test/[name].js'
    },
    module: {
        loaders: [
           /* {
                test: /\.js?$/,
                loader: 'ng-annotate!babel',
                exclude: /node_modules/,
                discardComments: {removeAll: true}
            },*/
            {
                test: /\.(js|jsx)(-lazy)?$/,
                exclude: /node_modules/,
                //loader: 'ng-annotate!babel-loader',
                loader : 'babel-loader',
                discardComments: {removeAll: true}
            }
        ],
        postLoaders : [{
                test: /\.(js|jsx)(-lazy)?$/,
                // babel-rumtime 也有 a.default 形式的代码，不能排除
                //exclude: /node_modules/,
                loaders: ['es3ify-loader']
            }, 
            // 这个配置放到打包到生产环境中去，测试环境打到一个包
            {
                test: /-lazy\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'bundle-loader?lazy&name=[name]!es3ify-loader'
            },
            {
                test: /jweixin-1\.0\.0\.js$/,
                exclude: /node_modules/,
                loader: 'bundle-loader?lazy&name=[name]!es3ify-loader'
            }
        ]
    },
    resolve:{
        extensions:['','.js','.json'],
        root: path.dirname(__dirname),
        alias: {
            'react': path.join(__dirname, 'public/src/js/lib/react'),
            'react-dom': path.join(__dirname, 'public/src/js/lib/react-dom'),
            'jquery' : path.join(__dirname,'public/src/js/lib/jquery-1.12.3.min'),
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.BannerPlugin(banner, {
            entryOnly: true
        })
    ]
};