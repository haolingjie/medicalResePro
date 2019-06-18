// pages/setMeal/setMeal.js
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
    var cardInfo = JSON.parse(options.cardInfo);
    this.setData({
      cardInfo: cardInfo,
      loginMethod: options.loginMethod
    });
    that = this;
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
  selectOrgan: function () {
    wx.navigateTo({
      url: '../selectOrgan/selectOrgan?cardCode=' + this.data.cardInfo.cardcode + "&loginMethod=" + that.data.loginMethod,
    })
  }
  // },
  // downloadFile: function (e) {
  //   console.log(e);
  //   let type = e.currentTarget.dataset.type;
  //   let url = e.currentTarget.dataset.url;
  //   switch (type) {
  //     case "pdf":
  //       url += 'pdf';
  //       break;
  //     case "word":
  //       url += 'docx';
  //       break;
  //     case "excel":
  //       url += 'xlsx';
  //       break;
  //     default:
  //       url += 'pptx';
  //       break;
  //   }
  //   wx.downloadFile({
  //     url: url,
  //     header: {},
  //     success: function (res) {
  //       var filePath = res.tempFilePath;
  //       console.log(filePath);
  //       wx.openDocument({
  //         filePath: filePath,
  //         success: function (res) {
  //           console.log('打开文档成功')
  //         },
  //         fail: function (res) {
  //           console.log(res);
  //         },
  //         complete: function (res) {
  //           console.log(res);
  //         }
  //       })
  //     },
  //     fail: function (res) {
  //       console.log('文件下载失败');
  //     },
  //     complete: function (res) { },
  //   })
  // }
})