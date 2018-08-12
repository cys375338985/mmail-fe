require("./index.css");
require('page/common/nav/index.js');
require('page/common/header/index.js');
var orderService = require('service/order_service.js');
var mm = require('util/mm.js');
var templateIndex = require('./index.string');
var page = {
    data:{
        orderNumber : mm.getUrlParam("orderNumber")
    },
    init: function () {
        this.onLoad();
    },

    onLoad : function () {

        this.loadPaymentInfo();
    },
    loadPaymentInfo: function(){
        var _this = this,
            paymentHtml = '',
            $pagewrap = $(".page-wrap");
        $pagewrap.html("<div class='loading'></div>");
        orderService.pay(this.data.orderNumber,function (res) {
            console.log(res);
            var data  = res.data;
            paymentHtml = mm.renderHtml(templateIndex,data);
            $pagewrap.html(paymentHtml);
            _this.listenOrderStatus();
        },function(errMsg){
            $pagewrap.html("<div class='err-msg'>"+errMsg+"</div>");
        });
    },
    listenOrderStatus : function () {
        var _this =this;
      this.paymentTimer  = setInterval(function () {
            orderService.getPaymentStaus(_this.data.orderNumber,function (res) {
                if(res.data==true){
                    window.location.href= './result.html?type=payment&orderNumber='
                        +_this.data.orderNumber;
                }
            },function (errorMsg) {

            });
        },5e3);
    }

};
$(function () {
    page.init();
});