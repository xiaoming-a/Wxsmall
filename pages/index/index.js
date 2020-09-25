// 0 引入用来发送请求的方法
import {
  request
} from "../../request/index"
//Page Object
Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    catesList: [],
    //楼层数据
    floorList: []
  },
  //options(Object),页面加载就触发
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  //获取轮播图数据
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then(result => {
      this.setData({
        swiperList: result
      })
    })
  },
  getCatesList() {
    request({
      url: "/home/catitems"
    }).then(result => {
      this.setData({
        catesList: result
      })
    })
  },
  getFloorList() {
    request({
      url: "/home/floordata"
    }).then(result => {
      this.setData({
        floorList: result
      })
    })
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});