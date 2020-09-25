// 0 引入用来发送请求的方法
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  //商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options;
    this.getGoodsDetail(goods_id);
  },
  //获取商品的详情数据
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    })
    this.GoodsInfo = res;
    this.setData({
      goodsObj: {
        goods_name: res.goods_name,
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.pics,
      }
    })
  },
  //预览图片
  handlePrevewImage(e) {
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      //购物车没有，第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    } else {
      //购物车已有数据 num++
      cart[index].num++;
    }
    //从新加回缓存
    wx.setStorageSync('cart', cart)
    //弹出提示
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1500,
      mask: true,
    });
  }
})