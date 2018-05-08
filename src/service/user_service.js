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
    }
};
module.exports=_user;