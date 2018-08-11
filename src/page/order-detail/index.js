require("./index.css");
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navside =  require('page/common/nav-side/index.js');
var orderService = require('service/order_service.js');
var mm = require('util/mm.js');
var templateIndex = require('./index.string');
var page = {
    data:{
        orderNumber : mm.getUrlParam("orderNumber")
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },

    onLoad : function () {
        navside.init({
            name: 'order-list'
        });
        this.loadDetail();
    },
    loadDetail: function(){
        var _this = this,
            orderDetailHtml = '',
            $detailCon = $(".content");
            $detailCon.html("<div class='loading'></div>");
            orderService.detail(this.data.orderNumber,function (res) {
                    console.log(res);
                    var data  = res.data;
                    _this.dataFilter(data);
                    orderDetailHtml = mm.renderHtml(templateIndex,data);
                    $detailCon.html(orderDetailHtml);
             },function(errMsg){
                $detailCon.html("<div class='err-msg'>"+errMsg+"</div>");
            });
    },
    bindEvent: function(){
        var _this = this;
        $(document).on('click','.order-cancel',function () {
            if(window.confirm("是否取消该订单")){
                orderService.cancel(_this.data.orderNumber,function (res) {
                    _this.loadDetail();
                },function (error) {
                    mm.errorTips("取消订单错误");
                });
            }

        });
    },
    dataFilter: function (data) {
        data.needPay = (data.status==10);
        data.isCancelable =  (data.status==10);

    }

};
$(function () {
    page.init();
});