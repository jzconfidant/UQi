var app = getApp()
var _this
var amapFile = require('../../libs/amap-wx.js')
var islogin = false

Page({
    data: {
        scale: 17,
        longitude: 120.585316,
        latitude: 31.298886,
    },
    onReady: function (e) {
        this.mapCtx = wx.createMapContext('map')
    },
    onLoad: function () {
        _this = this
        var myAmapFun = new amapFile.AMapWX({ key: '4ffd9adeef1253e6a3a048386d196e84' })
        try {
            var info = wx.getSystemInfoSync()
        } catch (e) {

        }
        _this.setData({
            controls: [{
                id: 1,  // 扫码图标
                position: {
                    left: (info.windowWidth - 160) / 2,
                    top: info.windowHeight - 70,
                    width: 160,
                    height: 60
                },
                iconPath: '../../images/icon_scan_barcode.png',
                clickable: true
            },
            {
                id: 2,  // 定位图标
                position: {
                    left: 16,
                    top: info.windowHeight - 60,
                    width: 40,
                    height: 40
                },
                iconPath: '../../images/icon_map_location.png',
                clickable: true
            },
            {
                id: 3,
                position: {
                    left: info.windowWidth - 16 - 40,
                    top: info.windowHeight - 60,
                    width: 40,
                    height: 40
                },
                iconPath: '../../images/icon_map_menu.png',
                clickable: true
            }]
        })

        wx.getLocation({
            type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
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
    },
    // 当点击地图上按钮时触发，如扫码开锁、定位...
    controltap: function (e) {
        console.log(e.controlId)
        switch (e.controlId) {
            case 1: // 扫码开锁按钮
                if (islogin) {
                    wx.scanCode({
                        success: function (res) {
                            // success
                        },
                        fail: function (res) {
                            // fail
                        },
                        complete: function (res) {
                            // complete
                        }
                    })
                } else {
                    wx.navigateTo({
                        url: '../login/login',
                        success: function (res) {
                            // success
                        },
                        fail: function (res) {
                            // fail
                        },
                        complete: function (res) {
                            // complete
                        }
                    })
                }
                break
            case 2: // 定位按钮
                wx.getLocation({
                    type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
                    success: function (res) {
                        _this.setData({
                            longitude: res.longitude,
                            latitude: res.latitude
                        })
                        _this.mapCtx.moveToLocation()
                    },
                    fail: function (res) {
                        // fail
                    },
                    complete: function (res) {
                        // complete
                    }
                })
                break
            case 3:
                showBikeUnreservedInfo(e)
                break
            default:
                console.log('no...')
        }
    },
    // 当屏幕区域变动时触发
    regionchange: function (e) {

    },
    showBikeUnreservedInfo: function (e) {
        _this.setData({
            controls: [{
                id: 3,
                position: {
                    left: info.windowWidth - 16 - 40,
                    top: info.windowHeight - 60,
                    width: 40,
                    height: 40
                },
                iconPath: '../../images/icon_map_menu.png',
                clickable: true
            }]
        })
    },
    showBikeReservedInfo: function (e) {

    },
    hideBikeInfo: function (e) {

    }
})