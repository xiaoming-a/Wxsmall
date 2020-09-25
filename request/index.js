let ajaxTimes = 0;
export const request = (params) => {
  let header = {
    ...params.header
  };
  if (params.url.includes("/my/")) {
    header["Authorization"] = wx.getStorageSync('token')
  }
  ajaxTimes++;
  // 加载效果
  wx.showLoading({
    title: "加载中",
    mask: true,
  });
  // https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    var reqTask = wx.request({
      ...params,
      header: header,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message)
      },
      fail: (result) => {
        reject(result)
      },
      complete: () => {
        //关闭刷新图标
        ajaxTimes--;
        if (ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    });
  })
}