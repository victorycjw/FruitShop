// pages/money/withdraw/withdraw.js
const loginReq = require("../../../utils/loginReq.js")
const moneyReq = require("../../../utils/moneyReq.js")
const baseReq=require('../../../utils/baseReq.js')
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
    var that=this
    var openid = wx.getStorageSync("wxOPENID")
    that.checkUserInfo(openid)
    that.findDefaultBankcardByOpenid()
    that.findCodeParamer()
  },
  // 查询提现手续费
  findCodeParamer:function(){
    var that=this
    moneyReq.findCodeParamer({},function(res){
      console.log('手续费',res)
      var val = Number(res.data.obj.val)*100
      that.setData({
        codeParamer:val
      })
    })
  },
  // 查询默认银行卡
  findDefaultBankcardByOpenid:function(){
    var that=this
    var formdata={
      openid: wx.getStorageSync("wxOPENID")
    }
    baseReq.findDefaultBankcardByOpenid(formdata,function(res){
      console.log('默认',res)
      that.setData({
        bankItem:res.data.obj
      })
    })
    
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
  
  inputmoney:function(e){
    var that = this
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
  // 提现
  saveDeposit:function(){
    var that=this
    var inputMoney = that.data.inputMoney
    if (!inputMoney){
      wx.showToast({
        title: '输入提现金额',
        image: '/images/errortip.png'
      })
      return false
    }
    if (inputMoney<=0){
      wx.showToast({
        title: '金额错误',
        image: '/images/errortip.png'
      })
      return false
    }
    if (inputMoney%100!=0){
      wx.showToast({
        title: '金额不是整百',
        image: '/images/errortip.png'
      })
      return false 
    }
    wx.showModal({
      title: '提现说明',
      content: '提现需要审核并且有' + that.data.codeParamer+'%的手续费',
      success:function(modalRes){
        if (modalRes.confirm){

          var userInfo = that.data.userInfo
          var formdata = {
            userId: wx.getStorageSync("userId"),
            wxName: userInfo.wxName,
            wxPic: userInfo.wxPic,
            openid: userInfo.openid,
            phone: userInfo.phone,
            money: inputMoney,
            detailId: that.data.bankItem.id
          }
          wx.showLoading({
            title: '申请中...',
            mask: true
          })
          moneyReq.saveDeposit(formdata, function (res) {
            console.log(res)
            that.setData({
              inputMoney:''
            })
            wx.hideLoading()
            if (res.data.returnCode == 1) {
              wx.showToast({
                title: '申请成功',
                image: '/images/righttip.png'
              })
              that.onShow()
            } else if (res.data.returnCode==2){
              wx.showToast({
                title: '零钱不足',
                image: '/images/errortip.png'
              })
            }else{
              wx.showToast({
                title: '申请失败',
                image: '/images/errortip.png'
              })
            }
          })


        }
      }
    })

  },

  // 前往提现明细
  toWithdrawDetail: function(){
    wx.navigateTo({
      url: '../withdrawDetail/withdrawDetail',
    })
  },

  // 前往银行卡页面
  toBankCard:function(){
    wx.navigateTo({
      url: '../bankCard/bankCard',
    })
  }
  


})