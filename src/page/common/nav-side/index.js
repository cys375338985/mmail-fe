require("./index.css");
var mm = require('util/mm.js');
var navTmp = require('./index.string');

var navSide = {
    option :{
        name: '',
        navList:[
            {name: 'user-center' , desc: '个人中心', href:'./user-center.html'},
            {name: 'order-list' , desc: '我的订单', href:'./order-list.html'},
            {name: 'pass-update' , desc: '修改密码', href:'./pass-update.html'},
            {name: 'pass-update' , desc: '关于Mall', href:'./about.html'}

        ]
    },
    init: function (option) {

      $.extend(this.option,option);
      this.renderNav();
    },
    renderNav: function () {
        //
        var navlength = this.option.navList.length;
        for(var i = 0;i < navlength ;i++ ){
            if(this.option.name===this.option.navList[i].name){
                this.option.navList[i].isActive=true;
            }
            console.log(JSON.stringify(this.option));
            var navHtml = mm.renderHtml(navTmp,{
                navList : this.option.navList

            });
            $(".nav-side").html(navHtml);
        }
    }
};
module.exports = navSide;