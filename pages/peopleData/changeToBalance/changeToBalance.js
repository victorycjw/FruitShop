// pages/peopleData/changeToBalance/changeToBalance.js
const loginReq = require("../../../utils/loginReq.js")
const moneyReq = require("../../../utils/moneyReq.js")
const baseReq = require('../../../utils/baseReq.js')
const app = getApp()

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
    var that = this
    var openid = wx.getStorageSync("wxOPENID")
    that.checkUserInfo(openid)
  },


  checkUserInfo: function (openid) {
    var that = this
    var formdata = {
      openid: openid,
      userId: wx.getStorageSync("userId"),
    }
    loginReq.checkUserInfo(formdata, function (res) {
      console.log('checkuserinfo', res)
      var user_type = res.data.obj.userType
      wx.setStorageSync("userType", user_type)

      that.setData({
        userType: user_type,
        userInfo: res.data.obj
      })
    })
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
  // 会员号输入框
  inputUserCode:function(e){
    var that=this
    var code = e.detail.value
    if (code.length==7){
      that.findByUserCode(code)

    }
  },

  // 金额输入框
  inputmoney: function (e) {
    var that = this
    console.log(e)
    if (e.detail.value > that.data.userInfo.dibs) {
      wx.showToast({
        title: '超出零钱！',
        image: '/images/errortip.png',
        success: function (res) { },
      })
      that.setData({
        inputMoney: that.data.userInfo.dibs
      })
      return that.data.userInfo.dibs
    }
    that.setData({
      inputMoney: e.detail.value
    })
  },

  // 根据code查询用户信息
  findByUserCode: function (userCode){
    var that=this
    var formdata={
      userCode: userCode
    }
    baseReq.findByUserCode(formdata,function(res){
      console.log('用户信息',res)
      that.setData({
        checkUser: res.data.obj
      })
    })
  },

  // 转账 userId, money, beUserId
  dibsEditBalance:function(){
    var that=this
    var inputMoney = that.data.inputMoney
    var checkUser = that.data.checkUser
    var userInfo = that.data.userInfo
    if (!checkUser){
      wx.showToast({
        title: '人员不存在',
        image: '/images/errortip.png'
      })
      return false
    }
    if (!inputMoney) {
      wx.showToast({
        title: '输入提现金额',
        image: '/images/errortip.png'
      })
      return false
    }
    //inputMoney <= 0 ||
    if (inputMoney <= 0 ||isNaN(inputMoney)) {
      wx.showToast({
        title: '金额错误',
        image: '/images/errortip.png'
      })
      return false
    }
    var formdata={
      userId: userInfo.userId,
      money: inputMoney,
      beUserId: checkUser.userId
    }
    wx.showLoading({
      title: '转入中...',
      mask:true
    })
    moneyReq.dibsEditBalance(formdata,function(res){
      console.log('记录',res)
      wx.hideLoading()
      if (res.data.returnCode==1){
        wx.showToast({
          title: '成功',
          image: '/images/righttip.png'
        })
        that.onShow()
        that.setData({
          inputMoney:'',
          checkUser:''
        })
      }else{
        wx.showToast({
          title: '异常',
          image: '/images/errortip.png'
        })
      }
    })
  }
})