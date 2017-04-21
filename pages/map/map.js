var app = getApp()

Page({
    data: {
        scale: 17,
        longitude: 120.585316,
        latitude: 31.298886
    },
    onLoad: function () {
        var _this = this

        wx.getLocation({
            type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            success: function (res) {
                console.log("longitude=" + res.longitude)
                console.log("latitude=" + res.latitude)
                _this.setData({
                    longitude: res.longitude,
                    latitude: res.latitude
                })
            },
            fail: function (res) {
                // fail
            },
            complete: function (res) {
                // complete
            }
        })
    }
})