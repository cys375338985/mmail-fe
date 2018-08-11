var mm = require('util/mm.js');
var address = {
    getAddressList :function(resolve , reject) {
             mm.request({
                 url: mm.getServerUrl('/shipping/list.do'),
                 data:{
                     pageNum:1,
                     pageSize: 50
                 },
                 success : resolve,
                 error : reject
             });
    },
    addAddress : function (data,resolve,reject) {
        mm.request({
            url: mm.getServerUrl('/shipping/add.do'),
            data:data,
            success : resolve,
            error : reject
        });
    },
    updateAddress : function (data,resolve,reject) {
        mm.request({
            url: mm.getServerUrl('/shipping/update.do'),
            data:data,
            success : resolve,
            error : reject
        });
    },
    getAddressInfo: function (shippingId,resolve,reject) {
        mm.request({
            url: mm.getServerUrl('/shipping/select.do'),
            data :{
                shippingId: shippingId
            },
            success : resolve,
            error : reject
        });
    },
    del: function (shippingId,resolve,reject) {
        mm.request({
            url: mm.getServerUrl('/shipping/del.do'),
            data :{
                shippingId: shippingId
            },
            success : resolve,
            error : reject
        });
    }


};
module.exports= address;