require("./index.css");
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navside =  require('page/common/nav-side/index.js');
var userService = require('service/user_service.js');
var mm = require('util/mm.js');
var templateIndex = require('./index.string');
var page = {
  init: function () {
      this.onLoad();
  },
    onLoad : function () {
        navside.init({
            name: 'user-centenr'
        });
        this.loadUserInfo();
    },
    loadUserInfo: function () {
      var userHtml = '';
      userService.getUserInfo(function (res) {
          console.log(res);
            userHtml= mm.renderHtml(templateIndex,res.data);
          $('.panel-body').html(userHtml);
        },function (errMsg) {

        });
    }

};
$(function () {
    page.init();
});