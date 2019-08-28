// pages/sweepDetail/sweepDetail.js

var maskLayer = require('../../../utils/xmls/maskLayer/maskLayer.js'); //遮罩
var util = require("../../../utils/util.js")
var pro_req = require("../../../utils/product.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(ops) {
    console.log(ops)
    var that = this
    var id = ops.id
    var userId = wx.getStorageSync("userId")
    that.getRedPacketListById(id)
    that.setData({
      sweepType: ops.sweepType
    })
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
    // that.getUserInfoFrom()
  },


  getRedPacketListById: function(id) {
    var that = this
    var formdata = {
      id: id
    }
    pro_req.getRedPacketListById(formdata, function(res) {
      console.log("这里是单个雷包列表", res)
      that.setData({
        lanmine_info: res.data
      })
    })
  },





  getUserInfoFrom: function() {
    var that = this
    var openid = wx.getStorageSync("wxOPENID")
    var clientId = wx.getStorageSync("clientId")
    pro_req.getUserInfo(openid, function(rc) {
      console.log("查询信息", rc)
      that.setData({
        userInfo: rc.data.userInfo
      })
      if (clientId == "") {
        wx.setStorageSync("user_info", rc.data.userInfo)
        wx.setStorageSync("clientId", rc.data.userInfo.CLIENT_ID)
      }
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