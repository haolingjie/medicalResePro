//index.js
//获取应用实例
const app = getApp()
var that;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    that = this;
    // 登录
    wx.login({
      success: function (res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          data: {
            'code': res.code,
          },
          url: 'https://www.tuozai.club/api/wechat/wxLogin',
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            that.setData({
              openId: res.data.openid,
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
      }
    })
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  loginSubmit: function(e) {
    wx.request({
      data:{
        'cardCode': e.detail.value.idCard,
        'passWord': e.detail.value.password,
        'loginMethod': '1',
      },
      url: 'https://www.tuozai.club/api/wechat/login',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if(res.data.code == 0){
          var cardInfo = res.data.cardList[0];
          //0：未激活
             if (cardInfo.cardstatus == '0' || cardInfo.cardstatus == '4'){
            //发送消息给后台
            wx.request({
              data: {
                'cardcode': cardInfo.cardcode,
                'cardstatus': cardInfo.cardstatus,
              },
              url: 'https://www.tuozai.club/api/wechat/activateCard',
              method: 'POST',
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                that.showModal(res.data.msg);
              }
            });
            // wx.showToast({
            //   title: '该卡片未激活',
            //   icon: 'none',
            //   duration: 2000
            // });
           //1：已激活 
          } else if (cardInfo.cardstatus == '1'){
            wx.navigateTo({
              url: "../editCardInfo/editCardInfo?cardList=" + JSON.stringify(res.data.cardList) + "&loginMethod=0" + "&openId=" + that.data.openId,
            });
            //2已预购
          } else if (cardInfo.cardstatus == '2') {
               wx.navigateTo({
                 url: '../browsingCardInfo-two/browsingCardInfo-two?cardcode=' + cardInfo.cardcode + "&medicalcode=" + cardInfo.medicalcode,
            });
            //3已到检
          } else if (cardInfo.cardstatus == '3') {
            wx.showToast({
              title: '已体检成功，等待寄送体检报告',
              icon: 'none',
              duration: 2000
            });
            //4：已过期   
          }
          //  else if (cardInfo.cardstatus == '4') {
          //   wx.showToast({
          //     title: '该卡片已过期',
          //     icon: 'none',
          //     duration: 2000
          //   });
          // } 
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail:function(res){
        wx.showToast({
          title: '系统错误',
          icon: 'none',
          duration: 2000
        });
      },
    })
  },
  showModal(msg) {
    wx.showModal({
      content: msg,
      showCancel: false,
    });
  }
})