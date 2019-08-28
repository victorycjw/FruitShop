// pages/peopleData/myTeam/myTeam.js
const baseReq =require('../../../utils/baseReq.js')
const loginReq = require("../../../utils/loginReq.js")

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
    var that=this
    that.findUserBranch()
  },

  // 我的团队
  findUserBranch:function(){
    var that=this
    var formdata={
      userId: wx.getStorageSync("userId")
    }
    baseReq.findUserBranch(formdata,function(res){
      console.log("我的团队",res)
      that.setData({
        brachList:res.data.list
      })
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
    var that=this
    var openid = wx.getStorageSync('wxOPENID')
    if (openid){
      that.checkUserInfo(openid)

    }
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
      wx.setStorageSync("userInfo", res.data.obj)
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

  }
})