require("./index.css");
require('page/common/nav/index.js');
require('page/common/header/index.js');
var cartServic = require('service/cart_service.js');
var productService  = require('service/product_service.js');
var mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        listParam :{
            productId: ''
        }
    },
    init : function () {
        this.initData();
        this.onLoad();
        this.bindEvent();
    },
    initData: function(){
        this.data.listParam.productId = mm.getUrlParam('productId') || ''
    },
    onLoad: function () {

        if(!this.data.listParam.productId){
            mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent: function () {
        var _this = this;
        var $doc =  $(document);
        $doc.on('mouseenter','.p-img-item', function () {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src',imageUrl)
        });
        $doc.on('click','.p-count-btn',function () {
            var $this =  $(this);
            var $inputcount = $('.p-count');
            var count = parseInt($inputcount.val());
            var minCount = 1;
            var maxCount= parseInt(_this.data.pagedata.stock);
            if($this.hasClass('plus') && count<maxCount){
                $inputcount.val(++count);
                return;
            }
            if($this.hasClass('minus') && count>minCount){
                $inputcount.val(--count);
                return;
            }
        });
        $doc.on('click','.cart-add',function () {
            cartServic.addToCart({
                productId : _this.data.listParam.productId,
                count : $('.p-count').val()
            },function (res) {
                window.location.href = './result.html?type=cart-add';
            },function (errormsg) {

            });
        });
    },
    loadDetail:function () {
         var html = '';
         var _this = this;
         var $pageWrap = $('.page-wrap');
        productService.getProductDetail(this.data.listParam.productId,function (res) {
            var _data =   _this.filter(res.data);
            //_data.stock = 5;
            _this.data.pagedata = _data;
            html= mm.renderHtml(templateIndex,_data);
            $pageWrap.html(html);
        },function (errorMsg) {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了。。。</p>');
        });
    },
    filter: function (data) {
        data.subImages = data.subImages.split(',');
       return data;
    }
};
$(function () {
    page.init();
});
