var _mm = require('util/mm.js');
var order_service = {
    getProuductList:function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error : reject
        });
    },
    create: function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            data: data,
            success: resolve,
            error: reject
        });
    },
    list: function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            data: data,
            success: resolve,
            error: reject
        });
    },
    detail: function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/detail.do'),
            data: {
                orderNo: data
            },
            success: resolve,
            error: reject
        });
    },
    cancel: function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: data
            },
            success: resolve,
            error: reject
        });
    }

};
module.exports= order_service;
