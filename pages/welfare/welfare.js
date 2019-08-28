// pages/welfare/welfare.js

var pro_req = require("../../utils/product.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  toGame: function() {
    var that = this
    if (wx.getStorageSync("userId")) {
      wx.navigateTo({
        url: '../../package/pages/sweep/sweep',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        confirmText: "立即前往",
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../people/people',
            })
          }
        }
      })
    }

  },


  toSubsidy: function() {
    var that = this
    if (wx.getStorageSync("userId")) {
      var userType = wx.getStorageSync("userType")
      if (userType =="normal"){
        wx.showToast({
          title: '请先提升身份',
          image: '/images/errortip.png'
        })
        return false
      }
      var formdata = {}
      wx.showLoading({
        title: 'loading',
        mask: true
      })
      pro_req.getSubsidyDateState(formdata, function(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.returnCode == 1) {
          wx.navigateTo({
            url: '../../package/pages/subsidy/subsidy',
          })
        } else {
      
          wx.showModal({
            title: '提示',
            content: '活动暂未开启,请准时前来!',
            showCancel: false,
          })
        }

      })

    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        confirmText: "立即前往",
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../people/people',
            })
          }
        }
      })
    }

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