require("./index.css");
require('page/common/nav/index.js');
require('page/common/header/index.js');

var productService  = require('service/product_service.js');
var mm = require('util/mm.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');
var page = {
    data : {
        listParam :{
            keyword:mm.getUrlParam('keyword')|| '',
            categoryId:mm.getUrlParam('categoryId')|| '',
            pageNum:mm.getUrlParam('pageNum') || 1,
            pageSize:mm.getUrlParam('pageSize') || 20,
            orderBy : mm.getUrlParam('orderBy') || 'default'
        }
    },
  init : function () {

        this.onLoad();
        this.bindEvent();
  },
    onLoad: function () {
        this.loadList();
    },
    bindEvent: function () {
        var _this = this;
        $('.sort-item').click(function () {
            _this.data.listParam.pageNum=1;
            var $this =  $(this);
            if($this.data('type')==='default'){
                if ($this.hasClass('active')){
                    return;
                }else {
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy='default';
                }
            }else if($this.data('type')==='price'){
                //                                      sort-item
                $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc');
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy='price_asc';
                }else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy='price_desc';
                }
            }
            _this.loadList();
        });
    },
    loadList:function () {
        var _this = this;
        var listHtml = '';
        var listParam = this.data.listParam;
        var $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        listParam.categoryId ?
            (delete listParam.keyword)
            : (delete listParam.categoryId);
          productService.getProuductList(listParam,function (res) {
            var data = res.data;
            console.log(data);
              listHtml = mm.renderHtml(templateIndex,{
                  list : data.list
              });
              $('.p-list-con').html(listHtml);
              _this.loadPagination({
                  hasPreviousPage: data.hasPreviousPage,
                  prePage: data.prePage,
                  hasNextPage: data.hasNextPage,
                  nextPage: data.nextPage,
                  pageNum: data.pageNum,
                  pages: data.pages
              });
          },function (errorMsg) {
              _mm.errorTips(errorMsg)
          });
    },
    loadPagination: function (pageInfo) {
        var _this = this;
        this.pagination ? '' :  this.pagination =  new Pagination();
       this.pagination.render($.extend({},pageInfo,{
           container : $('.pagination'),
           onSelectPage : function (pageNum) {
               _this.data.listParam.pageNum=pageNum;
               _this.loadList();
           }
       }));
    }
};
$(function () {
    page.init();
});
module.exports=Pagination;