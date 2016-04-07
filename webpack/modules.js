/**
    该文件将 webpack.config.js 里的 entry/output 配置抽离
    配置规则与 webpack 一致，支持 page 和 lib 两种打包模式
*/
var path = require('path')
var rootPath = path.dirname(__dirname)
var vacationLibPath = path.join(rootPath, 'public/dest/js/lib')
var vacationAppPath = path.join(rootPath, 'public/dest/js/app')
var vacationAppCssPath = path.join(rootPath, 'public/dest/stylesheets/css');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 打包每个页面 js 的配置

var pageConfigs = {
    index: {
        entry: ['./public/src/js/app/index/index'],
        output: {
            path: vacationAppPath,
            filename: 'index/[name].min.js',
            chunkFilename: 'index/[[name].[chunkhash].js',
        },
        // 特殊字段，页面js的库/框架依赖
        productionConfig: {}
    },
    register: {
        entry: './public/src/js/app/register/register',
        output: {
            path: vacationAppPath,
            filename: 'register/[name].min.js',
            chunkFilename: 'register/[[name].[chunkhash].js'
        },
        // 特殊字段，页面js的库/框架依赖
        productionConfig: {}
    },
    testLess : {
        entry : ['./public/src/stylesheets/less/main'],
        plugins : [
            new ExtractTextPlugin('./public/dest/stylesheets/[name].min.css')
        ]
    }
};

// 打包库的配置
var libConfigs = {
    vendor: {
        entry:{'gt':'./public/src/js/lib/gt.js'},
        output: {
            path: vacationLibPath,
            filename: '[name].min.js',
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['', '.js', '.jsx'],
            root: rootPath,
            alias: {
                'react': path.join(rootPath, 'lib/react-lite.common'),
                'react-dom': path.join(rootPath, 'lib/react-lite.common')
            }
        },
        /*
         自定义的特殊字段，当打包方式为 production 生产模式时
         将 productionConfig 的 key/value 合并到 webpackConfig
         注意：它会覆盖之前的配置
        */
        productionConfig: {
            resolve: {
                extensions: ['', '.js', '.jsx'],
                root: rootPath,
                alias: {
                    'react': path.join(rootPath, 'lib/react-lite.common'),
                    'react-dom': path.join(rootPath, 'lib/react-lite.common')
                }
            }
        }
    },
    search_lib: {
        entry: './lib/search_lib',
        output: {
            path: vacationLibPath,
            filename: '[name].js',
            libraryTarget: 'umd'
        }
    }
}

// 为 lib 打上标记
Object.keys(libConfigs).forEach(function(moduleName) {
    libConfigs[moduleName].isLib = true
})

module.exports = Object.assign({}, libConfigs, pageConfigs)
