// pages/money/withdrawDetail/withdrawDetail.js
const moneyReq = require("../../../utils/moneyReq.js")
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
    var that=this
    that.findDeposit()
  },

  // 查询提现记录
  findDeposit: function(){
    var that=this
    // console.log(wx.getStorageSync(key))
    var formdata={
      openid: wx.getStorageSync("wxOPENID")
    }
    moneyReq.findDeposit(formdata,function(res){
      console.log("提现明细",res)
      that.setData({
        depositList:res.data.list
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