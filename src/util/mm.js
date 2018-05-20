/*
* param = {
*   method:'get', 请求参数
*   url:''请求的url
*   type：'' 请求的数据类型
*   data：请求的数据参数
*   success ： function
*   error： function
*
* }
*
* */
var Hogan = require('hogan');
var conf = {
    serverHost:'http://www.mmail.com/apis'
};
var _mm={
    request : function (param ) {
        var _this= this;
        $.ajax({
            type: param.method||'get',
            url : param.url|| '',
            dataType: param.type||'json',
            data : param.data,
            success : function (res) {
                if(0===res.status){
                    typeof param.success === "function" && param.success(res);

                }else if(10 === res.status){
                    _this.doLogin();
                }else if(1 === res.status){
                    typeof param.error === "function" && param.error(res.msg);
                }
            },
            error : function (err) {
                typeof param.error === "function" && param.error(err.statusText);
            }
        });
    },
    getServerUrl : function (path) {
        return conf.serverHost + path ;
    },
    getUrlParam : function (name) {
      var regtx =name+"=(.*?)(&|$)";
      var reg = new RegExp(regtx);
      var result = window.location.search.match(reg);
      //console.log(result.groups["value"]);
      return result ? decodeURIComponent(result[1]):null;
    },
    renderHtml : function (htmlTemplate,data) {
            var template = Hogan.compile(htmlTemplate);
            var resut  = template.render(data);
            return resut
    },
    successTips : function (msg) {

            alert("成功:"+msg);
    },
    errorTips: function (msg) {
        alert("失败："+msg);
    },
    validata: function (value,type) {
        value=$.trim(value);
        if('require' === type){
            return !!value
        }
        if('phone'=== type){

            return /^1\d{10}$/.test(value);
        }
        if('mail'===type){
            return /^[^@]*@[^.]*(\.\w+)*$/.test(value);

        }
    },
    doLogin: function () {
        window.location.href='./user-login.html?redirect='+(encodeURIComponent(window.location.href));
    },
    goHome: function () {
        window.location.href='./index.html';

    }
};
module.exports=_mm;