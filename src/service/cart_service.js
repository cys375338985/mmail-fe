var _mm = require('util/mm.js');
var _cat = {
    getCartCount: function (resolve , reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_count.do'),
            success : resolve,
            error : reject
        });
    },
    addToCart : function (data,resolve , reject) {
        //resolve({});
       _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            data: data,
            success : resolve,
            error : reject
       });
    },
    getCartList : function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    selectProduct: function (productid,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/select.do'),
            data: {productId: productid},
            success: resolve,
            error: reject
        });
    },
    unselectProduct: function (productid,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select.do'),

            data: {productId: productid},
            success: resolve,
            error: reject
        });
    },
    selectProductAll : function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    unselectProductAll : function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    updateProduct: function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/updata.do'),
            data: data,
            success: resolve,
            error: reject
        });
    },
    delectProduct: function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/delect_product.do'),
            data: data,
            success: resolve,
            error: reject
        });
    }
};
module.exports= _cat;