require("./index.css");
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navside =  require('page/common/nav-side/index.js');
var userService = require('service/user_service.js');
var mm = require('util/mm.js');
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        navside.init({
            name: 'user-password-update'
        });
        //this.loadUserInfo();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click','.btn-sumbit', function () {
            var userInfo = {
                password : $.trim($("#password").val()),
                passwordnew : $.trim($("#passwordnew").val()),
                passwordconfirm: $.trim($("#passwordconfir").val())
            };
            validateResult = _this.formValidate(userInfo);
            if(validateResult.statis){
                userService.restPassword(userInfo,function (res) {
                    mm.successTips(res.msg);
                    window.location.href = './user-login.html';
                },function (errMsg) {
                    mm.errorTips(errMsg);
                });
            }else {
                mm.errorTips(validateResult.msg);
            }

        });
    },
    formValidate: function (fromData) {
        var result = {
            statis: false,
            msg: ''
        };
        if(!mm.validata(fromData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(!fromData.passwordnew || fromData.passwordnew.length < 6){
            result.msg = '密码长度不能小于6位';
            return result;
        }

        if(fromData.passwordnew !== fromData.passwordconfirm){
            result.msg = '两次密码不一致';
            return result;
        }
        result.statis = true;
        result.msg = '验证通过';
        return result;
    }

};
$(function () {
    page.init();
});
