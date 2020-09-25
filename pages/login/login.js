// pages/login/login.js
Page({
  headleGetUserInfo(e) {
    const {
      userinfo
    } = e.detail;
    wx.setStorageSync("userinfo", userinfo);
    wx.navigateBack({
      delta: 1,
    });
  }
})