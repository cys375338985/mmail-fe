var _mm=require('util/mm.js');
var _user = {
  logout : function (resolve , reject) {
      _mm.request({
          url: _mm.getServerUrl('/user/logout.do'),
          method : 'POST',
          success : resolve,
          error : reject
      });
  },
    checkLogin: function (resolve , reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    login: function (userinfo,resolve , reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            method : 'POST',
            data: userinfo,
            success : resolve,
            error : reject
        });
    },
    register: function (userinfo,resolve , reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            method : 'POST',
            data: userinfo,
            success : resolve,
            error : reject
        });
    },
    checkUsername: function (username,resolve,reject) {
      var data = {
          str:username,
          type:"username"
      };
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            method : 'POST',
            data: data,
            success : resolve,
            error : reject
        });
    },

    checkEmail: function (email,resolve,reject) {
        var data = {
            str:email,
            type:"email"
        };
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            method : 'POST',
            data: data,
            success : resolve,
            error : reject
        });
    },
    getQuestion : function (username, resolve,reject) {
      var data = {
          username : username
      };
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            method : 'POST',
            data: data,
            success : resolve,
            error : reject
        });
    },
    checkAnswer :function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            method : 'POST',
            data: data,
            success : resolve,
            error : reject
        });
    },
    fogetResetPassword:function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            method : 'POST',
            data: data,
            success : resolve,
            error : reject
        });
    },
    getUserInfo : function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success:resolve,
            error:reject
        });
    },

    updateInformation:function (userinfo,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            method : 'POST',
            data: userinfo,
            success : resolve,
            error : reject
        });
    },

    restPassword : function (userinfo,resolve,reject) {
        var data = {
            password:userinfo.password,
            passwordNew:userinfo.passwordnew
        };
        _mm.request({
            url: _mm.getServerUrl('/user/rest_password.do'),
            method : 'POST',
            data: data,
            success : resolve,
            error : reject
        });

    }
};
module.exports=_user;