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
        this.bindEvent();
    },
    onLoad : function () {
        navside.init({
            name: 'user-centenr'
        });
        this.loadUserInfo();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click','.btn-sumbit', function () {
            var userInfo = {
                phone : $.trim($('#phone').val()),
                email : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val())
            };
            validateResult = _this.formValidate(userInfo);
            if(validateResult.statis){
                userService.updateInformation(userInfo,function (res) {
                    mm.successTips(res.msg);
                    window.location.href = './user-centenr.html';
                },function (errMsg) {
                    mm.errorTips(errMsg);
                });
            }else {
                mm.errorTips(validateResult.msg);
            }

        });
    },
    loadUserInfo: function () {
        var userHtml = '';
        userService.getUserInfo(function (res) {
            console.log(res);
            userHtml= mm.renderHtml(templateIndex,res.data);
            $('.panel-body').html(userHtml);
        },function (errMsg) {

        });
    },
    formValidate: function (fromData) {
        var result = {
            statis: false,
            msg: ''
        };

        if(!mm.validata(fromData.phone,'phone')){
            result.msg = '手机格式不正确';
            return result;
        }
        if(!mm.validata(fromData.email,'mail')){
            result.msg = 'email格式不正确';
            return result;
        }
        if(!mm.validata(fromData.question,'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if(!mm.validata(fromData.answer,'require')){
            result.msg = '密码提示答案不能为空';
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
