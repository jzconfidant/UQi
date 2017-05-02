var timer = require('../../plugins/wxTimer.js');

var vcodeEnabled = false
var wxTimer = new timer({
    beginTime: "00:00:10",
    complete: function () {
        console.log("完成了")
    },
    interval: 2,
    intervalFn: function () {
        console.log("过去了2秒");
    }
})

Page({
    data: {
        isAgree: false,
        disabled: true,
        vcode: "获取验证码",
        vcode_color: "gray"
    },
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },
    phoneInput: function (e) {
        if (e.detail.value.length == 11) {
            this.setData({
                vcode_color: "#3CC51F"
            })
            vcodeEnabled = true
        } else {
            this.setData({
                vcode_color: "gray"
            })
            vcodeEnabled = false
        }
    },
    vcodeTap: function (e) {
        var that = this
        if (vcodeEnabled) {

            wxTimer.start(this)
        }
    }
});