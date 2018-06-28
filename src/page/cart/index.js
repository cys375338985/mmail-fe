require("./index.css");
var nav = require('page/common/nav/index.js');
require('page/common/header/index.js');
var cartServic = require('service/cart_service.js');
var productService  = require('service/product_service.js');
var mm = require('util/mm.js');
var templateIndex = require('./index.string');
var page= {
    data:{},
    init:function () {
        this.onLoad();
        this.bindEvent();

    },
    onLoad:function () {
        this.loadCart();
    },
    deleteCartProduct: function (productids) {
        var $pageWrap= $('.page-wrap'),
            _this = this
        cartServic.delectProduct({productids: productids}, function (res) {
            _this.renderCart(res.data);
        }, function (error) {
            $pageWrap.html('<p class="err-tip">服务器错误</p>');
        });
    },
    bindEvent: function () {
        var $pageWrap = $('.page-wrap');
        var _this= this,
        $doc = $(document);
        $doc.on('click', '.cart-select',function () {
            var $this= $(this),
                produtid = $this.parents('.cart-table').data('product-id');
                if($this.is(':checked')){
                    cartServic.selectProduct(produtid,function (res) {
                        _this.renderCart(res.data);
                    },function(errMsg){
                        $pageWrap.html('<p class="err-tip">服务器错误</p>');
                    });
                }else {
                    cartServic.unselectProduct(produtid,function (res) {
                        _this.renderCart(res.data);
                    },function(errMsg){
                        $pageWrap.html('<p class="err-tip">服务器错误</p>');
                    });
                }
        });
        $doc.on('click', '.cart-select-all',function () {
            var $this= $(this),
                produtid = $this.parents('.cart-table').data('product-id');
            if($this.is(':checked')){
                cartServic.selectProductAll(function (res) {
                    _this.renderCart(res.data);
                },function(errMsg){
                    $pageWrap.html('<p class="err-tip">服务器错误</p>');
                });
            }else {
                cartServic.unselectProductAll(function (res) {
                    _this.renderCart(res.data);
                },function(errMsg){
                    $pageWrap.html('<p class="err-tip">服务器错误</p>');
                });
            }
        });
        $doc.on('click','.count-btn',function () {
             var $this = $(this),
                    $pCont = $this.siblings('.count-input'),
                    type = $this.hasClass('plus')?'plus':'minus',
                    productId= $this.parents('.cart-table').data('product-id'),
                    currCount  = $pCont.val(),
                    minCount = 1,
                    maxCount =  parseInt($pCont.data('max')),
                    newCount = 0;
             if(type === 'plus'){
                    if(currCount >= maxCount){
                        _mm.errorTips('该商品数量已达上限');
                        return;
                    }
                    newCount = parseInt(currCount)+1;
             }else if(type === 'minus'){
                 if(currCount <= minCount){
                     return
                 }
                 newCount = parseInt(currCount)-1;
             }
            cartServic.updateProduct({
                productId : productId,
                count: newCount
            },function (res) {
                _this.renderCart(res.data);
            },function (error) {
                $pageWrap.html('<p class="err-tip">服务器错误</p>');
            })
        });
        $doc.on('click','.cart-delete',function () {
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            _this.deleteCartProduct(productId)
        });
        $doc.on('click','.delete-selected',function () {
                var $checkdeChdekboxs = $(".cart-select:checked");
                var productIds = [];
                for(var i=0,iLength = $checkdeChdekboxs.length; i<iLength ; i++){
                    var  productId = $($checkdeChdekboxs[i])
                        .parents('.cart-table').data('product-id');
                    productIds.push(productId);
                }
                if(productIds.length){
                    _this.deleteCartProduct(productIds.join(','));
                }else {
                    mm.errorTips('没有选中的商品');
                }
        });
        $doc.on('click','.btn-submit',function () {
            if(_this.data.cartInfo && _this.data.cartInfo.cartToalPrice > 0){
                window.location.href = './confirm.html';
            }else {
                mm.errorTips("选择商品后在提交")
            }
        })

    },
    loadCart : function () {
        var _this = this,
            html  = '',
            $pageWrap = $('.page-wrap');
        cartServic.getCartList(function (res) {
            _this.renderCart(res.data);
        },function (errMsg) {
            $pageWrap.html('<p class="err-tip">服务器错误</p>');
        });
    },
    renderCart : function (data) {
        var html = '';
        var $pageWrap = $('.page-wrap');
        this.filter(data);
        console.log(data);
        this.data.cartInfo = data;
        nav.loadCarCount();
        html = mm.renderHtml(templateIndex,data);
        $pageWrap.html(html);
    },
    filter : function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    }
};
$(function () {
    page.init();
});