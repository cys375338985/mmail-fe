require("./index.css");
require('page/common/nav/index.js');
require('page/common/header/index.js');

var productService  = require('service/product_service.js');
var orderService = require("service/order_service.js");
var addressService = require('service/address_service.js');
var mm = require('util/mm.js');
var productListTmp = require('./product-list.string');
var addressListTmp =  require('./address-list.string');
var addressModle = require('./address-modal');
var page = {
    data : {
        selectedAddressId : null
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on("click",".address-item",function () {
            $(this).addClass("active")
                .siblings('.address-item')
                .removeClass("active");
            _this.data.selectedAddressId=$(this).data("id");
        });

        $(document).on('click',".order-submit",function () {
            var shippingid = _this.data.selectedAddressId;
            if(shippingid){
                orderService.create({shippingId:shippingid},function (res) {
                    console.log(res);
                    window.location.href='./payment.html?orderNumber='+res.data.orderNo;

                },function (error) {
                    console.log(error)
                });
            }else{
                mm.errorTips('');

            }
        });

        $(document).on('click','.address-add',function () {
                addressModle.show({
                    isUpdatate: false,
                    onSuccess: function () {
                      _this.loadAddressList();
                    }
                });
        });

        $(document).on('click','.address-update',function (e) {
            var  $this= $(this);
            //var shippingId =  $this.data("id");'
            var shippingId = $this.parents(".address-item").data("id");
            addressService.getAddressInfo(shippingId,function (res) {
                addressModle.show({
                    isUpdate: true,
                    data: res.data,
                    onSuccess: function () {
                        _this.loadAddressList();
                    }
                });
            },function (errorMsg) {
                    mm.errorTips(errorMsg);
            });

            e.stopPropagation();
        });

        $(document).on('click','.address-delete',function (e) {
            var  $this= $(this);
            //var shippingId =  $this.data("id");'
            var shippingId = $this.parents(".address-item").data("id");
            if(window.confirm('是否删除该地址')){
                addressService.del(shippingId,function (res) {
                   _this.loadAddressList();
                },function (errorMsg) {
                    mm.errorTips(errorMsg);
                });
            }


            e.stopPropagation();
        });


     },
    loadAddressList : function () {
        var _this = this ;
        $(".address-con").html("<div class='loading'></div>");
        addressService.getAddressList(function (res) {
            console.log(res);
            var data = res.data;
            _this.addressFilter(data);
            var html  =mm.renderHtml(addressListTmp,data);
              //address-con
            $(".address-con").html(html);
        },function (error) {
            $(".address-con").html("<p class='err-tip'>地址加载错误</p>");
        });
    },
    addressFilter : function(data){
        console.log(data);
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag = false;
            for(var i = 0 ;  i < data.list.length; i++){
                 if(data.list[i].id === this.data.selectedAddressId){
                     data.list[i].isActive = true;
                     selectedAddressIdFlag =true;
                 }
            }
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }

    },
    loadProductList : function () {
        $(".product-con").html("<div class='loading'></div>");
        orderService.getProuductList(function (res) {
            console.log(res);
            var html  =mm.renderHtml(productListTmp,res.data);
            //address-con
            $(".product-con").html(html);
        },function (error) {
           $(".address-con").html("<p class='err-tip'>商品加载错误</p>")
        });
    }
};
$(function () {
    page.init();
});