require('page/common/nav-simple/index.js');
require('page/common/header/index.js');
require('./index.css');
var mm = require('util/mm.js');
var userService = require('service/user_service.js');
var page = {
  init: function () {
      this.bindEvent();
  },
  bindEvent: function () {
      var _this = this;
        $('#submit').click(function () {
                _this.submit();
        });
        $('.user-content').keyup(function (e) {
            if(e.keyCode===13){
                _this.submit();
            }
        });
        $('#username').blur(function () {
            var username  =  $.trim($(this).val());
            if(!username){
                return;
            }
            userService.checkUsername(username,function (res) {
                _this.erroehide();
            },
            function (errMsg) {
                _this.errorShow(errMsg);
            }
            );
        });

  },
  submit: function () {
      var _this = this;
        var formData = {
            username : $.trim($("#username").val()),
            password: $.trim($("#password").val()),
            passwordconfirm: $.trim($("#password-confirm").val()),
            phone: $.trim($("#phone").val()),
            email: $.trim($("#email").val()),
            question: $.trim($("#question").val()),
            answer: $.trim($("#answer").val())
        };
        validateResult = this.formValidate(formData);
        if(validateResult.statis){
            userService.register(formData,function (res) {
                window.location.href = './result.html?type=register';
            },
            function (errMsg) {
                _this.errorShow(errMsg);
            });
        }else {
             this.errorShow(validateResult.msg);
        }

  },
    formValidate: function (fromData) {
        var result = {
            statis: false,
            msg: ''
        };
       if(!mm.validata(fromData.username,'require')){
           result.msg = '用户名不能为空';
           return result;
       }

        if(!mm.validata(fromData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(fromData.password.length < 6){
            result.msg = '密码长度不能小于6位';
            return result;
        }

        if(fromData.password !== fromData.passwordconfirm){
            result.msg = '两次密码不一致';
            return result;
        }
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
    },
    errorShow: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    erroehide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
    
};
$(function () {
    page.init();
});