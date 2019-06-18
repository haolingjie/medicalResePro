// pages/setMeal/setMeal.js
var that;
var excelUrl = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  handleFruitChange({ detail = {} }) {
    this.setData({
      current: detail.value
    });
  },
  handleClick() {
    this.setData({
      position: this.data.position.indexOf('left') !== -1 ? 'right' : 'left',
    });
  },
  handleDisabled() {
    this.setData({
      disabled: !this.data.disabled
    });
  },
  handleAnimalChange({ detail = {} }) {
    this.setData({
      checked: detail.current
    });
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
    wx.request({
      data: JSON.stringify(cardInfo),
      url: 'https://www.tuozai.club/api/wechat/getTongCardStlyle',
      method: 'Post',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == '0') {
          if (res.data.tongCardStlyleList.length == 0) {
            excelUrl = "https://www.tuozai.club/statics/" + cardInfo.cardcode.substring(0, 1) + "_setMeal.xlsx";
            wx.downloadFile({
              url: excelUrl,
              success: function (res) {
                console.log(res)
                var Path = res.tempFilePath
                //返回的文件临时地址，用于后面打开本地预览所用
                wx.openDocument({
                  filePath: Path,
                  success: function (res) {
                    console.log('打开成功');
                  }
                })
              },
              fail: function (res) {
                console.log(res);
              }
            })
          }
          that.setData({
            // openId: res.data.openid,
            tongCardStlyleList: res.data.tongCardStlyleList,
            excelUrl: excelUrl
          });
        }
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
  },
  selectOrgan: function () {
    wx.navigateTo({
      url: '../selectOrgan/selectOrgan?cardCode=' + this.data.cardInfo.cardcode + "&loginMethod=" + that.data.loginMethod,
    })
  }, radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
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