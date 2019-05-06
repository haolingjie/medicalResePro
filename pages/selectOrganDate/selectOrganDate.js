// pages/selectOrganDate/selectOrganDate.js
var that;
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
    console.log(options)
    that =this;
    wx.request({
      data: {
        'cardcode': options.cardcode,
        'medicalcode': options.medicalcode
      },
      url: 'http://localhost:8080/api/wechat/selectOrganDate',
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
          icon: 'fail',
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

  },
  bindDateChange: function (e) {
    that.setData({
      ['cardInfo.medicaldateStr']: e.detail.value,
      dates: e.detail.value
    })
  },
  reservationSubmit: function (e) {
    wx.request({
      data: {
        'cardcode': e.detail.value.cardcode,
        'username': e.detail.value.username,
        'identitycard': e.detail.value.identitycard,
        'sex': that.data.cardInfo.sex,
        'maritalstatus': that.data.cardInfo.maritalstatus,
        'sendaddress': e.detail.value.sendaddress,
        'phobenumber': e.detail.value.phobenumber,
        'medicaldateStr': that.data.cardInfo.medicaldateStr,
        'medicalcode': that.data.medicalCenterVO.id,
      },
      url: 'http://localhost:8080/api/wechat/reservationSubmit',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 0){
          wx.showModal({
            title: '提示',
            content: '请耐心等待，系统将在 24H内以微信公众号提示形式发送给指定手机，系统可以随时登陆查看，系统可随时登陆查看',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../index/index',
                })
              } else {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '系统错误',
          icon: 'fail',
          duration: 2000
        });

      },
    })
  },sexRadiochange: function (e) {
    that.setData({
      ['cardInfo.sex']: e.detail.value
    });
  },
  maRadioChange: function (e) {
    that.setData({
      ['cardInfo.maritalstatus']: e.detail.value
    });
  }
})