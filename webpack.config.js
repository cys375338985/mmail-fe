var webpack = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var  HtmlWebpackPlugin = require('html-webpack-plugin');


// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';


var getHtmlConfig = function(name){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
       // favicon     : './favicon.ico',
       // title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};
var config ={
    entry:{
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },
    output:{
        path:'./dist/',
        publicPath  : '/dist/',
        filename:'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            {
                test: /\.string$/,
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
        ]
    },
    resolve:{
        alias : {
            util : __dirname+'/src/util',
            page : __dirname+'/src/page',
            service : __dirname+'/src/service',
            image : __dirname+'/src/image',
            node_modules : __dirname+'/node_modules'
        }

    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
    //
};

if('dev' === WEBPACK_ENV){
    console.log('dev');
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports  = config;