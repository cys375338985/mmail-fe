require('./index.css');
var templatePagination = require('./index.string');
var mm = require('util/mm.js');
var Pagination = function () {
  var _this = this;
  this.defaultOption = {
      container : null,
      pageNum : 1,
      pageRane : 3,
      onSelectPage : null
  };
  $(document).on('click','.pg-item',function () {
      var $this = $(this);
      if($this.hasClass('active') || $this.hasClass('disabled')){
          return;
      }
      $.isFunction(_this.option.onSelectPage) ?
          _this.option.onSelectPage($this.data('value')) : null;

  });
};
Pagination.prototype.render = function (userOption) {
    this.option = $.extend({},this.defaultOption,userOption);
    if(!(this.option.container instanceof  jQuery)){
        return;
    }

  // // if(!this.option.pages <=1 ){
   //     return;
   // }
    this.option.container.html(this.getPaginationHtml());
};
Pagination.prototype.getPaginationHtml = function () {
    var html = '';
    var option = this.option;
    var  pageArry = [];
    var start = option.pageNum - option.pageRane > 0?
            option.pageNum - option.pageRane : 1;
    var end = option.pageNum + option.pageRane < option.pages?
        option.pageNum + option.pageRane : option.pages;
    pageArry.push({
        name : '上一页',
        value : this.option.prePage,
        disabled : !this.option.hasPreviousPage
    });
    for(var i = start ; i <= end; i++){
        pageArry.push({
            name : i,
            value : i,
            active: (i===option.pageNum)
        });
    }
    pageArry.push({
        name : '下一页',
        value : this.option.nextPage,
        disabled : !this.option.hasNextPage
    });
    html = mm.renderHtml(templatePagination,{
        pageArray : pageArry,
        pageNum : option.pageNum,
        pages : option.pages
    });
    return html;
};
module.exports = Pagination;
