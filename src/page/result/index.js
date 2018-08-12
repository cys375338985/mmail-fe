require('page/common/nav-simple/index.js');
require('page/common/header/index.js');
require('./index.css');
var mm = require('util/mm.js');

$(function () {
   var type = mm.getUrlParam('type') || 'default';
   var $emt = $('.'+type+'-success');
   if(type === "payment"){
      var orderNo = mm.getUrlParam('orderNumber');
      $emt.find(".break-order-info").attr("href",
          "./order-detail?orderNumber="+orderNo);

   }
   $emt.show();
});