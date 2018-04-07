require("./index.css");
var mm =  require('util/mm.js');
var userservice = require('service/user_service.js');
console.log('thicos comon');
var nav = {
  init: function () {
        this.bindEvent();
        this.loadCarCount();
        this.loadCarCount();
        return this;
  },
    bindEvent:function () {
        $('.js-login').click(function () {
           mm.doLogin();
        });
        $('.js-register').click(function () {
            window.location.href='./view/register.html';
        });
        $(".js-logout").click(function () {
            userservice.logout(function (res) {
                window.location.reload()
            }, function (errmsg) {
                __mm.errorTips(errMsg);
            });
        });
    },
    loadUserInfo:function () {
         userservice.checkLogin(function (res) {
             $('.user-info.not-login')
                 .hide().sibling('.user.login')
                 .show().find('.username')
                 .text(res.uername);
         },function (erMsg) {
             
         });
    },
    loadCarCount: function () {

    }

};
module.exports = nav.init();