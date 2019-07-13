// pages/selectOrganDate/selectOrganDate.js
import WxValidate from '../../assets/plugins/wx-validate/WxValidate'
var that;
const app = getApp();
var utils = require('../../utils/util.js')
var selectOrageDates=new Array;
var noSelectOrageDates = new Array;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: [
      { name: '男', number: '1', },
      { name: '女', number: '0', }
    ],
    marriage: [
      { name: '已婚', number: '1', },
      { name: '未婚', number: '0', }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    that =this;
    that.setData({
      setMeal: options.setMeal,
      loginMethod: options.loginMethod
    });
    wx.request({
      data: {
        'cardcode': options.cardcode,
        'medicalcode': options.medicalcode
      },
      url: 'https://www.tuozai.club/api/wechat/selectOrganDate',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var curCanDateList = res.data.curCanDateList;
        selectOrageDates=[];
        noSelectOrageDates=[];
        for (var i = 0; i < curCanDateList.length; i++) {
          selectOrageDates.push({
            month: 'current', day: curCanDateList[i], color: 'black', background: ''
          });
        }
        var curRemoveDateList = res.data.curRemoveDateList;
        if (curRemoveDateList != null && curRemoveDateList.length>0){
          for (var i = 0; i < curRemoveDateList.length; i++) {
            selectOrageDates.push({
              month: 'current', day: curRemoveDateList[i], background: '#E0E0E0'
          });
        }
        }
        that.setData({
          cardInfo: res.data.cardInfoVo,
          medicalCenterVO: res.data.medicalCenterVO,
          // startDate: res.data.startDate,
          // endDate: res.data.endDate,
          selectOrageDates: selectOrageDates,
          allOrageDates: res.data.allOrageDates,
          allRemoveOrageDates: res.data.allRemoveOrageDates,
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
    let formId = e.detail.formId;
    utils.collectFormIds(formId); //保存推送码
    var formIds = app.globalData.globalFormIds; // 获取全局推送码
    if (formIds.length) {
     // formIds = JSON.stringify(formIds); // 转换成JSON字符串
      app.globalData.gloabalFomIds = ''; // 清空当前全局推送码
      console.log(formIds);
    }
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
        'setMeal': that.data.setMeal,
        'formIds': formIds,
      },
      url: 'https://www.tuozai.club/api/wechat/reservationSubmit',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 0){
          wx.showModal({
            title: '提示',
            content: '请耐心等待，系统将在24H内以微信公众号提示形式发送给指定手机，系统可以随时登陆查看',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../index/index',
                })
              }
            },
            showCancel: false
          })
          // wx.showToast({
          //   title: '请耐心等待，系统将在 24H内以微信公众号提示形式发送给指定手机，系统可以随时登陆查看',
          //   icon: "none",
          // });
          // setTimeout(() => {
          //   wx.hideToast();
          // }, 2000);
          // wx.navigateTo({
          //   url: '../index/index',
          // });
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
      this.showModal(error.msg)
      return false
    }
    /*** 这里添写验证成功以后的逻辑**/

    //验证通过以后->
    this.reservationSubmit(e);
  },
  showModal(msg) {
    wx.showModal({
      content: msg,
      showCancel: false,
    })
  },
  prevMonth: function (event) {
    console.log(event.detail);
    this.setSelectOrageDates(event);
  },
  nextMonth: function (event) {
    this.setSelectOrageDates(event);
  },
  dateChange: function (event) {
    this.setSelectOrageDates(event);
  },
  dayClick: function (event) {
    console.log(event.detail);
    var dates="";
    var selectOrageDates=that.data.selectOrageDates;
    for (var i = 0; i < selectOrageDates.length; i++) {
      if (event.detail.color == "#4a4f74"){
        this.showModal("该日期不可选");
        return;
      }
      //去除上次选中的颜色
      if (selectOrageDates[i].background == '#2facff' && event.detail.day != selectOrageDates[i].day) {
        selectOrageDates[i].background = '';
      }
      if (event.detail.day == selectOrageDates[i].day){
        selectOrageDates[i].background ='#2facff';
        var month = event.detail.month+"";
        if (month.length < 2) {
          month = "0" + month;
        }
        var day = event.detail.day + "";
        if(day.length <2){
          day = "0" + day;
        }
        dates = event.detail.year + "-" + month + "-"+ day;
      }
    }
    that.setData({
      selectOrageDates: selectOrageDates,
      dates: dates,
      ['cardInfo.medicaldateStr']: dates,
    });
  },
  setSelectOrageDates: function (event){
    selectOrageDates = [];
    var allOrageDates = that.data.allOrageDates;
    var allRemoveOrageDates = that.data.allRemoveOrageDates;
    for (var i = 0; i < allOrageDates.length; i++) {
      if (event.detail.currentMonth == allOrageDates[i].month && event.detail.currentYear == allOrageDates[i].year)       {
        selectOrageDates.push({
          month: 'current', day: allOrageDates[i].day, color: 'black', background: '',
        });
      }
    }
    for (var i = 0; i < allRemoveOrageDates.length; i++) {
      if (event.detail.currentMonth == allRemoveOrageDates[i].month && event.detail.currentYear == allRemoveOrageDates[i].year) {
        selectOrageDates.push({
          month: 'current', day: allRemoveOrageDates[i].day, background: '#E0E0E0',
        });
      }
    }
    that.setData({
      selectOrageDates: selectOrageDates,
    });
   
  }
})