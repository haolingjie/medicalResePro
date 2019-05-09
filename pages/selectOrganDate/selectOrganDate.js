// pages/selectOrganDate/selectOrganDate.js
import WxValidate from '../../assets/plugins/wx-validate/WxValidate'
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
          icon: 'none',
          duration: 2000
        });

      },
    });
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
        'identitycard': e.detail.value.idcard,
        'sex': that.data.cardInfo.sex,
        'maritalstatus': that.data.cardInfo.maritalstatus,
        'sendaddress': e.detail.value.sendaddress,
        'phobenumber': e.detail.value.tel,
        'medicaldateStr': that.data.cardInfo.medicaldateStr,
        'medicaldate': e.detail.value.medicaldate,
        'medicalcode': that.data.medicalCenterVO.id,
      },
      url: 'http://localhost:8080/api/wechat/reservationSubmit',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 0){
          // wx.showModal({
          //   title: '提示',
          //   content: '请耐心等待，系统将在 24H内以微信公众号提示形式发送给指定手机，系统可以随时登陆查看，系统可随时登陆查看',
          //   success: function (res) {
          //     if (res.confirm) {
          //       wx.navigateTo({
          //         url: '../index/index',
          //       })
          //     } else {
          //       console.log('用户点击取消')
          //     }
          //   }
          // })
          wx.showToast({
            title: '请耐心等待，系统将在 24H内以微信公众号提示形式发送给指定手机，系统可以随时登陆查看，系统可随时登陆查看',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000);
          wx.navigateTo({
            url: '../index/index',
          });
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
      medicaldate: {
        required: true,
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
      medicaldate: {
        required: '请输入体检日期',

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
    this.reservationSubmit(e);
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  }
})