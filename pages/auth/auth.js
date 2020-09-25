// 0 引入用来发送请求的方法
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  login
} from "../../utils/asyncWx.js"
// pages/auth/auth.js
Page({
  //获取用户信息
  async handleGetUserInfo(e) {
    try {
      const {
        encryptedData,
        rawData,
        signature,
        iv
      } = e.detail;
      const {
        code
      } = await login();
      const loginParams = {
        encryptedData,
        rawData,
        signature,
        iv,
        code
      }
      const {
        token
      } = await request({
        url: "/users/wxlogin",
        data: loginParams,
        method: "post"
      });
      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})