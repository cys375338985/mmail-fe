var _mm = require('util/mm.js');
var _cat = {
    getCartCount: function (resolve , reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_cart_count.do'),
            success : resolve,
            error : reject
        });
    }
};
module.exports= _cat;