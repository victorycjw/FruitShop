// pages/peopleData/coupon/coupon.js
const app = getApp()
const moneyReq = require("../../../utils/moneyReq.js")

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
    if (options.ordermoney){
      that.setData({
        ordermoney: options.ordermoney
      })
    }

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
    that.findAvailableCoupon()
  },
  // 获取优惠卷
  findAvailableCoupon:function(){
    var that=this
    var formdata={
      userId: wx.getStorageSync("userId")
    }
    moneyReq.findAvailableCoupon(formdata,function(res){
      console.log("优惠卷",res)
      that.setData({
        couponType: res.data.returnCode,
        couponList:res.data.list
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

  // 获取优惠卷信息
  getCouponId:function(e){
    console.log(e)
    var couponItem = e.currentTarget.dataset.item
    wx.navigateBack();

    // 往上一级页面传参
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一级页面
    prevPage.setData({
      couponItem: couponItem,
    });

  }
})