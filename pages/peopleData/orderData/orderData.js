// pages/peopleData/oderData/orderData.js
const orderReq = require("../../../utils/orderReq.js")
const app = getApp()

Page({
  //取消订单
  cancelOrder: function () {
    var that = this
    
    var formdata = {
      id: that.data.codeid,

    }
    orderReq.cancelOrder(formdata, function (res) {
      console.log("取消订单", res)
      if (res.data.returnCode == 1) {
        wx.showToast({
          title: '取消成功',
          image: '/images/righttip.png'
        })
        that.onShow()
      } else {
        wx.showToast({
          title: '异常',
          image: '/images/errortip.png'
        })
      }
    })
  },
  // 确认收货
  updateOrderStateRecipient: function () {
    var that = this
    var formdata = {
      orderId: that.data.codeid
    }
    wx.showLoading({
      title: '收货中...',
      mask: true
    })
    orderReq.updateOrderStateRecipient(formdata, function (res) {
      console.log("确认收货", res)
      if (res.data.returnCode == 1) {
        wx.showToast({
          title: '收货成功',
          image: '/images/righttip.png'
        })
        that.onShow()
      } else {
        wx.showToast({
          title: '异常',
          image: '/images/errortip.png'
        })
      }
    })
  },

  /** 
   * 页面的初始数据
   */
  data: {
    imgURL: app.globalData.imgURL,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,

  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var codeid = options.codeid
    console.log("-+------------------------------------------------")
    console.log(options)
    var pic1 =[]
    pic1=options.pcPic.split(",");
    console.log(pic1)
    that.setData({
      codeid: options.codeid,
      pcPic: pic1
    })
    console.log(that.data.pcPic)

    var orderData = JSON.parse(options.jsonObject)
    that.setData({
      orderData: orderData
    })
    console.log(orderData)
    var userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo.wxPic);
    that.setData({
      userPic: userInfo.wxPic
    })

    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log(res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
    that.findContact()
  },
  //获取我们的信息
  findContact: function () {
    var that = this

    baseReq.findContact({}, function (res) {
      console.log("联系我们", res)
      that.setData({
        contactData: res.data.list
      })
    })
  },
  // 联系我们
  callMe: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.contactData[0].phone,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
    console.log(this.data.codeid)
    return {
      title: '这里是小程序',
      path: '/pages/product/productData/productData?orderId='+this.data.codeid,
      success: function (res) {
        console.log(res.shareTickets[0])
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      }, 
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }


  }
})