var util = require("../../../utils/util.js")
var pro_req = require("../../../utils/product.js")
const loginReq = require("../../../utils/loginReq.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var that = this
    that.checkUserInfo()
    that.getCreateGameRecList()
  },

  checkUserInfo: function() {
    var that = this
    var formdata = {
      openid: wx.getStorageSync("wxOPENID"),
      userId: wx.getStorageSync("userId"),
    }
    loginReq.checkUserInfo(formdata, function(res) {
      console.log('checkuserinfo', res)
      that.setData({
        userInfo: res.data.obj
      })
    })
  },


  // 创建纪录
  getCreateGameRecList: function() {
    var that = this
    var userId = wx.getStorageSync("userId")
    var formdata = {
      page: 1,
      rows: 20,
      userId: userId
    }
    pro_req.getCreateGameRecList(formdata, function(res) {
      console.log("创建记录", res.data)
      that.setData({
        gameList: res.data.list
      })
    })
  },

  toSweepDetail: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../sweepDetail/sweepDetail?id=' + id,
    })
  },

  togameList: function() {
    wx.navigateTo({
      url: '../game/game',
    })
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

  }
})