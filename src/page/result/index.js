require('page/common/nav-simple/index.js');
require('page/common/header/index.js');
require('./index.css');
var mm = require('util/mm.js');

$(function () {
   var type = mm.getUrlParam('type') || 'default';
   var $emt = $('.'+type+'-success');
   $emt.show();
});