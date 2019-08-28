// pages/peopleData/myEvaluation/myEvaluation.js
const productReq = require("../../../utils/productReq.js")
const app=getApp()

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
    var that=this
    that.setData({
      user_info: wx.getStorageSync("user_info")
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
    that.findUserComment()
  },

  findUserComment:function(){
    var that=this
    var formdata={
      openid: wx.getStorageSync("wxOPENID"),
      page:1,
      rows:100
    }
    productReq.findUserComment(formdata,function(res){
      console.log("我的评价",res)
      that.setData({
        commentList:res.data
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

  ToOrder:function(){
    wx.navigateTo({
      url: '../order/order?tab=4',
    })
  }
})