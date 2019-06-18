// pages/cardInfo/cardInfo.js
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
  onLoad: function(options) {
    var cardList = JSON.parse(options.cardList);
    this.setData({
      cardInfo: cardList
    });
    that=this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  gotoLogin: function(e) {
    wx.navigateTo({
      url: '../index/index',
    });
  },
  gotoCardInfo: function(e) {
    var cardstatus = e.currentTarget.dataset.cardstatus;
    var cardcode = e.currentTarget.dataset.cardcode;
    console.log(e.currentTarget.dataset.cardcode);
    console.log(e.currentTarget.dataset.cardstatus);
    //0：未激活
    if (cardstatus == '0') {
      wx.showToast({
        title: '该卡片未激活',
        icon: 'none',
        duration: 2000
      });
      //1：已激活 
    } else if (cardstatus == '1') {
      var cardList=that.data.cardInfo;
      var cardInfo=[];
      for(var i=0;i<cardList.length;i++){
        if(cardList[i].cardcode=cardcode){
          cardInfo.push(cardList[i]);
          break;
        }
      }
      wx.navigateTo({
        url: "../editCardInfo/editCardInfo?cardList=" + JSON.stringify(cardInfo)
      });
      //2已预购
    } else if (cardstatus == '2') {
      wx.navigateTo({
        url: '../browsingCardInfo-two/browsingCardInfo-two?cardcode=' + cardcode + "&medicalcode=" + '',
      });
      //3已到检
    } else if (cardstatus == '3') {
      wx.showToast({
        title: '已体检成功，等待寄送体检报告',
        icon: 'none',
        duration: 2000
      });
      //4：已过期   
    } else if (cardstatus == '4') {
      wx.showToast({
        title: '该卡片已过期',
        icon: 'none',
        duration: 2000
      });
    }
  }
})