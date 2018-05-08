require("./index.css");
var mm = require('util/mm.js');
var userservice = require('service/user_service.js');
var cartservice = require('service/cart_service.js');
console.log('thicos comon');
var nav = {
    init: function () {
        this.bindEvent();
        this.loadCarCount();
        this.loadCarCount();
        return this;
    }, bindEvent: function () {
        $('.js-user-login').click(function () {
            mm.doLogin();
        });
        $('.js-register').click(function () {
            window.location.href = './view/register.html';
        });
        $(".js-logout").click(function () {
            userservice.logout(function (res) {
                window.location.reload()
            }, function (errmsg) {
                __mm.errorTips(errMsg);
            });
        });
    },
    loadUserInfo: function () {
        userservice.checkLogin(function (res) {
            $('.user-info.not-user-login')
                .hide().sibling('.user.login')
                .show().find('.username')
                .text(res.uername);
        }, function (erMsg) {

        });
    },
    loadCarCount: function () {
        cartservice.getCartCount(function (res) {
            $('.nav .nav-item .cart-cont').text(res || 0);
        }, function (errMsg) {
            $('.nav .nav-item .cart-cont').text(0);
        });
    }

};
module.exports = nav.init();