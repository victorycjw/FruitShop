// pages/peopleData/qrCode/qrCode.js
const app = getApp()
const baseReq = require("../../../utils/baseReq.js")
const loginReq = require("../../../utils/loginReq.js")
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
    // that.getUserRQCode()
    that.checkUserInfo()
  },

  checkUserInfo: function (openid) {
    var that = this
    var formdata = {
      openid: wx.getStorageSync("wxOPENID"),
      userId: wx.getStorageSync("userId"),
    }

    loginReq.checkUserInfo(formdata, function (res) {
      console.log(res)
      var user_type = res.data.obj.userType
      wx.setStorageSync("userInfo", res.data.obj)
      that.setData({
        userType: user_type,
        userInfo: res.data.obj
      })
    })
  },

  // 查询二维码
  getUserRQCode:function(){
    var that=this
    var formdata={
      openid: wx.getStorageSync("wxOPENID")
    }
    baseReq.getUserRQCode(formdata,function(res){
      console.log("查询",res)
      if (res.data.returnCode==1){
        that.setData({
          qrCodeList:res.data.list
        })
      }
      that.setData({
        qrCodeType: res.data.returnCode
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

  // 前往我的团队
  toMyTeam:function(){
    wx.navigateTo({
      url: '../myTeam/myTeam',
    })
  },

  // 生成二维码
  createUserRQCode:function(){
    var that=this
    var formdata={
      // openid: wx.getStorageSync("wxOPENID"),
      // rqNum:1,
      appId: app.globalData.APP_ID,
      mchKey: app.globalData.APP_SECRET,
      bossId: wx.getStorageSync("userId"),
      path:"pages/index/index"
    }
    wx.showLoading({
      title: 'loading...',
      mask:true
    })
    baseReq.createUserRQCode(formdata,function(res){
      console.log("生成二维码",res)
      wx.hideLoading()
      if (res.data.returnCode==1){
        wx.showToast({
          title: '生成成功',
          image: '/images/righttip.png'
        })
        that.onShow()
        // that.getUserRQCode()
      }else{
        wx.showToast({
          title: '生成异常',
          image: '/images/errortip.png'
        })
      }
    })
  },


  // 下载二维码
  QRCodeDownload: function () {
    var that = this
    var url = that.data.imgURL + that.data.userInfo.qrCode
    
    wx.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (rc) {
            wx.showToast({
              title: '保存成功',
              image: '/images/righttip.png'
            })
          },
          fail: function () {
            downType = 1

          }
        })
      }
    })

  },

})