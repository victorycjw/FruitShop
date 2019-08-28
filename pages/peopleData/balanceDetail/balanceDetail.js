// pages/peopleData/balanceDetail/balanceDetail.js
var moneyReq = require("../../../utils/moneyReq.js")

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
    var type=options.type
    that.findUserBalanceByType(type)
  },
  
  findUserBalanceByType: function (sourceType) {
    var that = this
    var formdata = {
      userId: wx.getStorageSync("userId"),
      openid: wx.getStorageSync("wxOPENID"),
      sourceType: sourceType
    }
    moneyReq.findUserBalanceByType(formdata, function (res) {
      console.log(res)
      that.setData({
        balanceList:res.data.list
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