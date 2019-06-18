// pages/editCardInfo/editCardInfo.js
import WxValidate from "../../assets/plugins/wx-validate/WxValidate";
var utils = require("../../utils/util.js")
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: [
      { name: '男' ,number:'1',},
      { name: '女' , number: '0', }
    ],
    marriage: [
      { name: '已婚', number: '1',},
      { name: '未婚', number: '0',}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var cardList = JSON.parse(options.cardList);
    var openId = options.openId;
    this.setData({
      cardInfo: cardList[0],
      openId,
      loginMethod: options.loginMethod
    });
    this.initValidate();
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
  sexRadiochange: function (e) {
    this.setData({
      ['cardInfo.sex']: e.detail.value,
    });
  },
  maRadioChange: function (e) {
    this.setData({
      ['cardInfo.maritalstatus']: e.detail.value
    });
  },
  editCardInfoSubmit: function (param) {
    var cardInfo = this.data.cardInfo;
    wx.request({
      data: {
        'cardcode': param.cardcode,
        'username': param.username,
        'identitycard': param.idcard,
        'sex': this.data.cardInfo.sex,
        'maritalstatus': this.data.cardInfo.maritalstatus,
        'openId': this.data.openId,
        'sendaddress': param.sendaddress,
        'phobenumber': param.tel
      },
      url: 'https://www.tuozai.club/api/wechat/editCardInfo',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.navigateTo({
            url: "../setMeal/setMeal?cardInfo=" + JSON.stringify(cardInfo) + "&loginMethod=" + that.data.loginMethod,
          })
        } else {
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
          icon: 'none',
          duration: 2000
        });

      },
    })
  },
  /*** 表单-验证字段*/
  initValidate() {
    /*** 4-2(配置规则)*/
    const rules = {
      username: {
        required: true,
        rangelength: [2, 15]
      },
      idcard: {
        required: true,
        idcard: true,
      },
      tel: {
        required: true,
        tel: true,
      },
      sendaddress: {
        required: true,
        rangelength: [2, 30]
      },
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      username: {
        required: '请输入姓名',
        rangelength: '请输入2~15个汉字个汉字'
      },
      tel: {
        required: '请输入11位手机号码',
        tel: '请输入正确的手机号码',
      },
      idcard: {
        required: '请输入身份证号码',
        idcard: '请输入正确的身份证号码',
      },
      sendaddress: {
        required: '请选择地址'
      },
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
    let formId = e.detail.formId;
    utils.collectFormIds(formId); //保存推送码
    this.editCardInfoSubmit(params);
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  }
})