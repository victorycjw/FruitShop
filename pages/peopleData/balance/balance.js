// pages/peopleData/balance/balance.js
const app = getApp()
const moneyReq = require("../../../utils/moneyReq.js")
const loginReq = require("../../../utils/loginReq.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgURL: app.globalData.imgURL
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
  toBalanceDetail:function(e){
    console.log(e)
    var type = e.currentTarget.dataset.type
    
    wx.navigateTo({
      url: '../balanceDetail/balanceDetail?type='+type,
    })
  }
})