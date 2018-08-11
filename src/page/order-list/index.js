require("./index.css");
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navside =  require('page/common/nav-side/index.js');
var userService = require('service/user_service.js');
var orderService = require('service/order_service.js');
var Pagination = require('util/pagination/index.js');
var mm = require('util/mm.js');
var templateIndex = require('./index.string');
var page = {
    data:{
        listParam : {
            pageNum : 1,
            pageSize: 10
        }
    },
    init: function () {
        this.pageUtil = new Pagination();
        this.onLoad();
    },
    onLoad : function () {
        navside.init({
            name: 'order-list'
        });
        this.loadList();
    },
    loadList: function () {
        var html = '';
        var _this = this;
        $('.order-list-con').html('<div class="loading"></div>');
        orderService.list(_this.data.listParam,function (res) {
            console.log(res);
            var data = res.data;
            _this.dataFilter(data);
            html = mm.renderHtml(templateIndex,data);
            $('.order-list-con').html(html);
            _this.loadPagination({
                hasPreviousPage: data.hasPreviousPage,
                prePage: data.prePage,
                hasNextPage: data.hasNextPage,
                nextPage: data.nextPage,
                pageNum: data.pageNum,
                pages: data.pages
            });
        },function (errMsg) {
            $('.order-list-con').html("<p class='err-tip'>加载失败，刷新试试呗</p>");
        });
    },
    loadPagination: function(pageinfo){
        var _this = this;
          _this.pageUtil.render($.extend({},pageinfo,{
              container : $('.pagination'),
              onSelectPage : function (pageNum) {
                  _this.data.listParam.pageNum=pageNum;
                  _this.loadList();
              }
          }));
    },
    dataFilter: function (data) {
        data.isEmpty = !data.list.length;

    }

};
$(function () {
    page.init();
});