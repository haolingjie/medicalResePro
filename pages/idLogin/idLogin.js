// pages/idLogin/idLogin.js
import WxValidate from '../../assets/plugins/wx-validate/WxValidate'

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
    this.initValidate();
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
        'identityCard': e.detail.value.idcard,
        'passWord': e.detail.value.password,
        'loginMethod': '2'
      },
      url: 'http://localhost:8080/api/wechat/login',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code =='0'){
          wx.navigateTo({
            url: "../cardInfo/cardInfo?cardList=" + JSON.stringify(res.data.cardList)
          });
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '系统错误',
          icon: 'fail',
          duration: 2000
        });
      }
    })
  }, 
  initValidate() {
    /*** 4-2(配置规则)*/
    const rules = {
      idcard: {
        required: true,
        idcard: true,
      }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      idcard: {
        required: '请输入身份证号码',
        idcard: '请输入正确的身份证号码',
      }
    };

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)

    /*** 也可以自定义验证规则*/
    this.WxValidate.addMethod('assistance', (value, param) => {
      return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
    }, '请勾选 《顺风男服务协议》')
  },
  submitForm(e) {
    /***4-3(表单提交校验)*/
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    /*** 这里添写验证成功以后的逻辑**/

    //验证通过以后->
    this.loginSubmit(e);
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  }
})