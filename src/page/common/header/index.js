require('./index.css');
var mm = require('util/mm.js');
var header = {
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        var kw = mm.getUrlParam("keyword");
        if(kw){
            $("#search-input").val(kw);
        }
    },
    bindEvent: function () {
        var _this=this;
        $('#search-btn').click(function () {
             _this.serchSubmit();

           /* param = {
                method:'get', 请求参数
                url:''请求的url
            type：'' 请求的数据类型
            data：请求的数据参数
            success ： function
            error： function
        }*/
        });
        $('#search-input').keyup(function (e) {
            console.log("111")
            if(e.keyCode===13){

                _this.serchSubmit();
            }


            /* param = {
             method:'get', 请求参数
             url:''请求的url
             type：'' 请求的数据类型
             data：请求的数据参数
             success ： function
             error： function
             }*/
        });

    },
    serchSubmit: function () {
        var kw = $.trim($("#search-input").val());
        if(kw){
           window.location.href='./list.html?keyword='+kw;
        } else {mm.goHome();}
    }

};
header.init();