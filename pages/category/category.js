// 0 引入用来发送请求的方法
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //右侧商品数据
    rightContent: [],
    //被点击的左侧菜单
    currentIndex: 0,
    //右侧商品分类滚动条回顶部
    scrollTop: 0
  },
  //接口返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCates()
    // 1.获取本地存储数据
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates()
    } else {
      //有旧数据，定义过期时间
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name)
        //右侧商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类数据
  async getCates() {
    const res = await request({
      url: "/categories"
    });
    this.Cates = res;
    //把接口的数据存入本地中
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    })
    //左侧菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name)
    //右侧商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent,
    })
  },

  //左侧菜单点击事件
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset;
    //右侧商品数据
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      //重设右侧商品分类滚动条回顶部
      scrollTop: 0
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})