// pages/idLogin/idLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  loginSubmit: function (e) {
    wx.request({
      data: {
        'identityCard': e.detail.value.idCard,
        'passWord': e.detail.value.password,
        'loginMethod': '2'
      },
      url: 'http://localhost:8080/api/wechat/login',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        wx.navigateTo({
          url: "../cardInfo/cardInfo?cardList=" + JSON.stringify(res.data.cardList)
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '系统错误',
          icon: 'fail',
          duration: 2000
        });
      }
    })
  }
})