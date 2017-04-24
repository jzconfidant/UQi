var markersData = [];
var amapFile = require('../../libs/amap-wx.js');

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    scale: 15,
    textData: {}
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
  },
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '4ffd9adeef1253e6a3a048386d196e84' });
    myAmapFun.getPoiAround({
      iconPathSelected: '../../img/icon_bike.png',
      iconPath: '../../img/icon_bike.png',
      width: 128,
      height: 128,
      success: function (data) {
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },

})
