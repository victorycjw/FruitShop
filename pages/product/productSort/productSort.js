// pages/product/productClass/productClass.js
var productReq = require("../../../utils/productReq.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgURL: app.globalData.imgURL,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.getCategroyAll()
  },

  // 商品分类
  getCategroyAll: function () {
    var that = this
    productReq.getCategroyAll({}, function (res) {
      that.setData({
        CategroyAllList: res.data.list
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

  },

  // 前往产品列表
  toProList:function(e){
    var that=this
    var catId = e.currentTarget.dataset.id

      // 美颜产品
    if (catId == "f6f70f8b39de44239342b95f74158105") {
      wx.navigateTo({
        url: '../videoList/videoList',
      })
    } else {
      wx.navigateTo({
        url: '../productList/productList?catId=' + catId,
      })
    }
  },


  // 前往积分商城
  toIntegralShop:function(res){
    var that=this
    wx.navigateTo({
      url: '../integralShop/integralShop?catId=b10258690ba04387bba4f6a789af51d4',
    })
  }
})