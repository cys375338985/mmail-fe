var webpack = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var  HtmlWebpackPlugin = require('html-webpack-plugin');


// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';


var getHtmlConfig = function(name,title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
       // favicon     : './favicon.ico',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};
var config ={
    entry:{
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'user-login':['./src/page/user-login/index.js'],
        'user-register':['./src/page/user-register/index.js'],
        'user-pass-reset':['./src/page/user-pass-reset/index.js'],
        'user-centenr':['./src/page/user-centenr/index.js'],
        'user-centenr-update':['./src/page/user-centenr-update/index.js'],
        'user-password-update':['./src/page/user-password-update/index.js'],
        'order-confirm':['./src/page/order-confirm/index.js'],
        'order-detail' :  ['./src/page/order-detail/index.js'],
        'order-list':['./src/page/order-list/index.js'],
        'payment':['./src/page/payment/index.js'],
        'result':['./src/page/result/index.js'],
        'list':['./src/page/list/index.js'],
        'detail':['./src/page/detail/index.js'],
        'cart':['./src/page/cart/index.js']
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
               /* query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }*/
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
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-centenr','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-centenr-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-password-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','支付页面')),
        new HtmlWebpackPlugin(getHtmlConfig('result','结果')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车'))
    ]
    //
};
if('dev' === WEBPACK_ENV){
    console.log('dev');
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports  = config;