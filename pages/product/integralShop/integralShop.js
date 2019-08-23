// pages/product/integralShop/integralShop.js
const productReq = require("../../../utils/productReq.js")
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
    var that = this
    var catId = options.catId
    that.findIntegralProduct(catId)
  },

  // 获取积分商品
  findIntegralProduct:function(id){
    var that=this
    var formdata={
      categoryId: id
    }
    productReq.findIntegralProduct(formdata,function(res){
      console.log('积分产品',res)
      that.setData({
        integralList:res.data.list,
        catData:res.data.obj
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

  // 跳转到商品详情
  toProductData: function (e) {
    console.log(e)
    var proId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../integralPro/integralPro?proId=' + proId,
    })
  },
})