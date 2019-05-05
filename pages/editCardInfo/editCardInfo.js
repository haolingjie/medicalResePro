// pages/editCardInfo/editCardInfo.js
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
    var cardList = JSON.parse(options.cardList);
    this.setData({
      cardInfo:cardList[0]
    });
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
  sexRadiochange: function (e) {
    this.setData({
      ['cardInfo.sex']: e.detail.value
    });
  },
  maRadioChange: function (e) {
    this.setData({
      ['cardInfo.maritalstatus']: e.detail.value
    });
  },
  editCardInfoSubmit: function(e){
    console.log(e.detail.value.cardcode);
    var cardInfo=this.data.cardInfo;
    wx.request({
      data: {
        'cardcode': e.detail.value.cardcode,
        'username': e.detail.value.username,
        'identitycard': e.detail.value.identitycard,
        'sex': this.data.cardInfo.sex,
        'maritalstatus': this.data.cardInfo.maritalstatus,
        'sendaddress': e.detail.value.sendaddress,
        'phobenumber': e.detail.value.phobenumber
      },
      url: 'http://localhost:8080/api/wechat/editCardInfo',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.navigateTo({
          url: "../setMeal/setMeal?cardInfo=" + JSON.stringify(cardInfo)
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '系统错误',
          icon: 'fail',
          duration: 2000
        });

      },
    })
  }
})