// pages/money/recharge/recharge.js
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
    var that = this
    that.findPayGift()
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
  // 查询充值有礼
  findPayGift:function(){
    var that=this
    moneyReq.findPayGift({},function(res){
      console.log(res)
      that.setData({
        giftList:res.data.list
      })
    })
  },


  addbalance:function(e){
    var that=this
    var user_info = wx.getStorageSync("userInfo")
    wx.showLoading({
      title: '支付中...',
      mask:true
    })
    var formdata={
      userId: wx.getStorageSync("userId"),
      openid: wx.getStorageSync("wxOPENID"),
      wxName: user_info.wxName,
      wxPic: user_info.wxPic,
      money: e.detail.value.money,
      appId: app.globalData.APP_ID,
      mchId: app.globalData.mchId,
      mchKey: app.globalData.mchKey,
    }
    console.log(formdata)
    moneyReq.addbalance(formdata,function(res){
      console.log("生成支付",res)


      /**微信支付 */
      wx.requestPayment({
        timeStamp: res.data.map.timeStamp,
        nonceStr: res.data.map.nonceStr,
        package: res.data.map.package,
        signType: "MD5",
        paySign: res.data.map.paySign,
        success: function (rescus) {
          wx.hideLoading()
          wx.showToast({
            title: '支付成功！',
            image: "/images/righttip.png"
          })

        },
        fail: function () {
          wx.showToast({
            title: '支付失败！',
            image: "/images/errortip.png"
          })
        }
      })

      /**
       * 不带支付
       */
      // wx.showToast({
      //   title: '支付成功',
      //   image: "/images/righttip.png"
      // })
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

  // 选择充值金额
  checkMoney:function(e){
    var that=this
    var index = e.currentTarget.dataset.index
    var money = e.currentTarget.dataset.money
    that.setData({
      money: money,
      checkIndex:index
    })
  }
})