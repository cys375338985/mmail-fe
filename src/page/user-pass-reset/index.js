require('page/common/nav-simple/index.js');
require('page/common/header/index.js');
require('./index.css');
var mm = require('util/mm.js');
var userService = require('service/user_service.js');
var page = {
    data : {
        username : '',
        question :    '',
        answer:     '',
        token:       ''

    },
    init: function () {
        this.bindEvent();
        this.noLoad();
    },
    bindEvent: function () {
        var _this = this;
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            if(username) {
                userService.getQuestion(username, function (res) {
                    _this.data.username= username;
                    _this.data.question= res.data;
                    _this.loadStepQustion();
                }, function (errMsg) {
                    _this.errorShow(errMsg);
                });
            }else {
                _this.errorShow("用户名不能为空");

            }
        });

        $('#submit-qustion').click(function () {
            var answer = $.trim($('#answer').val());
            if(answer) {
                userService.checkAnswer({
                    username : _this.data.username,
                    question: _this.data.question,
                    answer : answer

                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token= res.data;
                    console.log(res);
                    _this.loadStepPassword();
                }, function (errMsg) {
                    _this.errorShow(errMsg);
                });
            }else {
                _this.errorShow("请输入密码提示问题的答案");

            }
        });

        $('#submit-pass').click(function () {
            var pass = $.trim($('#password').val());
            if(pass && pass.length>= 6) {
                _this.data.password= pass;
                userService.fogetResetPassword({
                    username : _this.data.username,
                    password : pass,
                    token : _this.data.token
                }, function (res) {
                    console.log(res);
                    window.location.href='./result.html?type=pass-reset';
                }, function (errMsg) {
                    _this.errorShow(errMsg);
                });
            }else {
                _this.errorShow("请输入不少于六位的新密码");

            }
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
                        || './index.html';
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
    },
    noLoad: function () {
        this.loadStepUsername();
    },
    loadStepUsername : function () {
        $('.step-username').show();
    },
    loadStepQustion : function () {
        this.erroehide();
        $('#question').text(this.data.question);
        $('.step-username').hide().siblings('.step-question').show();
    },
    loadStepPassword : function () {
        this.erroehide();

        $('.step-question').hide().siblings('.step-password').show();
    }
};
$(function () {
    page.init();
});