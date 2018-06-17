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

  },
  submit: function () {
      var _this = this;
        var formData = {
            username : $.trim($("#username").val()),
            password: $.trim($("#password").val())
        };
        validateResult = this.formValidate(formData);
        if(validateResult.statis){
            userService.login(formData,function (res) {
                window.location.href = mm.getUrlParam('redirect')
                    || './index.string';
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