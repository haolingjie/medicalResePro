
// pages/browsingCardInfo/browsingCardInfo.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: [
      { name: '男', checked: true },
      { name: '女', checked: false }
    ],
    marriage: [
      { name: '已婚', checked: true },
      { name: '未婚', checked: false }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.request({
      data: {
        'cardcode': options.cardcode,
        'medicalcode': options.medicalcode
      },
      url: 'http://localhost:8080/api/wechat/browsingCardInfo',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          cardInfo: res.data.cardInfoVo,
          medicalCenterVO: res.data.medicalCenterVO
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '系统错误',
          icon: 'none',
          duration: 2000
        });

      },
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