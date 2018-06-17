require('./css.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var navside =  require('page/common/nav-side/index.js');
var template = require('./banner.string');
var mm = require('util/slider/index.js');
navside.init({
    name : "user-center"
});
$(function () {
    $('.banner-con').html(template);
    var $slider = $('.banner').unslider({dots : true});
   $(".banner-con .banner-arrow").click(function () {
       var forward = $(this).hasClass('prev')?'prev':'next';
       $slider.data('unslider')[forward]();
   });
});