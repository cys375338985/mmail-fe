
"use strict"
var addressService = require('service/address_service.js');
var mm = require('util/mm.js');
var cityutil = require('util/cites/index.js');
var  addressModaltmp  = require('./address-modal.string');
var addressModal = {
    show : function (opt) {
        this.option= opt;
        this.option.data = opt.data || {};
        this.$modalWrap= $(".modal-wrap");
        this.loadModal();
        this.bindEvent();
         console.log("show");
    },
    hide: function () {
        this.$modalWrap.empty();
    },
    loadModal: function () {
        var addressModalHtml =
            mm.renderHtml(addressModaltmp,{
                isUpdate : this.option.isUpdate,
                data : this.option.data
            });
        this.$modalWrap.html(addressModalHtml);
        this.loadProvince(this.option.isUpdate);

    },
    loadProvince: function(isUpdate){
        var provinces =   cityutil.getProvinces()|| [],
            $provincesSelect  = this.$modalWrap.find("#receiver-province");
        $provincesSelect.html(this.getSelectionOption(provinces));
        if(isUpdate && this.option.data.receiverProvince){
            $provincesSelect.val(this.option.data.receiverProvince);
            console.log(1);
            this.loadCites(this.option.data.receiverProvince,true);

        }
    },
    getSelectionOption : function(optionArr){
        var html = "<option value=''>请选择</option>";
        for(var i = 0 ; i<optionArr.length; i++){
            html+= "<option value='"+optionArr[i]+"' class=''>"+optionArr[i]+"</option>";
        }
        return html;
    },
    loadCites: function(provinceName,isUpdate) {
        var cityes =  cityutil.getCities(provinceName),
            $cictysSelect  = this.$modalWrap.find("#receiver-cicty");
        $cictysSelect.html(this.getSelectionOption(cityes));
        if(isUpdate && this.option.data.receiverCity){
            $cictysSelect.val(this.option.data.receiverCity);
        }
    },
    bindEvent: function () {
        var _this = this,
            $provincesSelect  = this.$modalWrap.find("#receiver-province"),
            $addressbtn =   this.$modalWrap.find(".address-btn"),
            $closebtn =  this.$modalWrap.find(".close"),
            $modalcontainer  = this.$modalWrap.find(".modal-container");

        $provincesSelect.change(function () {
            var selectedProvince = $(this).val();
            _this.loadCites(selectedProvince);
        });

        $addressbtn.click(function () {
            var receiverInfo = _this.getReceiverInfo(),
              isUpdate =   _this.option.isUpdate;
            if(!receiverInfo.staus){
                mm.errorTips(receiverInfo.errMsg || "哪里不对了");
                return;
            }
            if(isUpdate){
                receiverInfo.data.id=_this.option.data.id;
                addressService.updateAddress(receiverInfo.data,function (res) {
                    mm.successTips("地址修改成功");
                    _this.hide();
                    typeof  _this.option.onSuccess ==='function' &&  _this.option.onSuccess();
                },function (errormsg) {
                    mm.errorTips(errormsg);
                });

            }else {
               addressService.addAddress(receiverInfo.data,function (res) {
                   mm.successTips("地址添加成功");
                   typeof  _this.option.onSuccess ==='function' &&  _this.option.onSuccess();
                   _this.hide();
               },function (errormsg) {
                   mm.errorTips(errormsg);
               });
            }
        });

        $closebtn.click(function () {
            _this.hide();
        });
        $modalcontainer.click(function (e) {
            e.stopPropagation();
        });
    },
    getReceiverInfo : function () {
        var receiverInfo  = {},
            result = {
                staus : false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find("#receiver-name").val());
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find("#receiver-province").val());
        receiverInfo.receiverCity = $.trim(this.$modalWrap.find("#receiver-cicty").val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find("#receiver-address").val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find("#receiver-phone").val());
        receiverInfo. receiverZip= $.trim(this.$modalWrap.find("#receiver-zip").val());
        if (!receiverInfo.receiverName) {
            result.errMsg=("请输入收件人名");
            return result;
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg="请选择收件人所在的省份";
            return result;
        } else if (!receiverInfo.receiverCity) {
            result.errMsg="请选择收件人所在的城市";
            return result;
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg="请输入详细地址";
            return result;
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg="请输入收件人手机号码";
            return result;
        } else {
            result.staus = true;
            result.data = receiverInfo;
        }
        return result;
    }
};

module.exports=addressModal;