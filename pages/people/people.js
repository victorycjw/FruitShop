// pages/people/people.js
const util = require("../../utils/util.js")
const loginReq = require("../../utils/loginReq.js")
const productReq = require("../../utils/productReq.js")
const orderReq= require("../../utils/orderReq.js")
const baseReq = require("../../utils/baseReq.js")
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
    var openid = wx.getStorageSync("wxOPENID")
    if (openid){
      that.checkUserInfo(openid)
      that.findUserOrderCount(openid)
    }
  },
  checkUserInfo:function(openid){
    var that=this
    var formdata={
      openid: openid,
      userId: wx.getStorageSync("userId"),
    }
    loginReq.checkUserInfo(formdata,function(res){
      console.log('checkuserinfo', res)
      var user_type = res.data.obj.userType
      if (user_type!=2){
        that.findShare(user_type)
      }
      wx.setStorageSync("userType", user_type)
      wx.setStorageSync("userInfo", res.data.obj)
      that.setData({
        userType: user_type,
        userInfo: res.data.obj 
      })
    })
  },

  // 查询身份名称
  findShare: function (code){
    var that=this
    var formdata={
      code:code
    }
    loginReq.findShare(formdata,function(res){
      console.log('身份',res)
      that.setData({
        shareData: res.data.obj
      })
    })
  },

  // 查询订单数量
  findUserOrderCount: function (openid){
    var that=this
    var formdata={
      openid:openid
    }
    orderReq.findUserOrderCount(formdata,function(res){
      console.log("订单数量",res)
      that.setData({
        orderNumber:res.data.map
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
  // 登录
  tologin:function(e){
    var that=this
    wx.showLoading({
      title: 'loading',
      mask: true
    })
    console.log(11)
    var userInfo = e.detail.userInfo
    wx.setStorageSync("user_info", e.detail.userInfo)
    var bossId = wx.getStorageSync("bossId")
    util.getOpenId(function (res) {
      var data = JSON.parse(res.data.data)
      console.log(data)
      wx.setStorageSync("wxOPENID", data.openid)

      var formdata={
        openid: data.openid,
        wxName: userInfo.nickName,
        wxPic: userInfo.avatarUrl,
        bossId: bossId ? bossId:''
      }

      loginReq.adduser(formdata, function (rc) {
        console.log("授权登录", rc)
        wx.hideLoading()

        if (rc.data.returnCode == 1 || rc.data.returnCode == 0 || rc.data.returnCode == 3 || rc.data.returnCode == 2) {
          var user_type = rc.data.obj.userType
          that.setData({
            userInfo: rc.data.obj,
            openid: data.openid,
            userType: user_type
          })


          if (user_type != 2) {
            that.findShare(user_type)
          }

          wx.setStorageSync("userId", rc.data.obj.userId)
          wx.setStorageSync("userType", user_type)
          wx.setStorageSync("userInfo", rc.data.obj)
          wx.showToast({
            title: '登录成功',
            image: '/images/righttip.png'
          })


        } else {
          wx.showToast({
            title: '授权登录失败!',
            image: "/images/errortip.png"
          })
        }
      })
    })
  },



  // 前往推广二维码
  toQrCode:function(){
    var that=this
    var userid = wx.getStorageSync("userId")
    if(userid){
      wx.navigateTo({
        url: '../peopleData/qrCode/qrCode',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    }
  },

  // 前往我的订单
  toOrder:function(e){
    var that = this
    var userid = wx.getStorageSync("userId")
    var tab = e.currentTarget.dataset.tab
    if (userid){
      wx.navigateTo({
        url: '../peopleData/order/order?tab=' + tab,
      })
    }else{
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    }

  },

  // 前往收藏
  toCollection:function(){
    var that = this
    var userid = wx.getStorageSync("userId")
    if (userid) {
      wx.navigateTo({
        url: '../peopleData/collection/collection',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    }

  },
  // 前往充值
  toRecharge:function(){
    var that = this
    var userid = wx.getStorageSync("userId")
    if (userid) {
      wx.navigateTo({
        url: '../money/recharge/recharge',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    }

  },
  // 前往提现
  toWithdraw:function(){
    var that = this
    var userid = wx.getStorageSync("userId")
    var userInfo=that.data.userInfo
    if (!userid) {
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    } else if (!userInfo.phone){
      wx.showModal({
        title: '完善信息',
        content: '是否前往完善信息？',
        success: function(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../peopleData/peopleInfo/peopleInfo', 
            })
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../money/withdraw/withdraw',
      })
    }

  },

  // 我的余额
  toBalance:function(){
    var that = this
    var userid = wx.getStorageSync("userId")
    if (userid) {
      wx.navigateTo({
        url: '../peopleData/balance/balance',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    }

  },
  // 我的零钱
  toSmallChange: function () {
    var that = this
    var userid = wx.getStorageSync("userId")
    if (userid) {
      wx.navigateTo({
        url: '../peopleData/smallChange/smallChange',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    }

  },
  // 积分
  toIntegral:function(){
    var that = this
    var userid = wx.getStorageSync("userId")
    if (userid) {
      wx.navigateTo({
        url: '../peopleData/integral/integral',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    }

  },
  // 优惠卷
  toCoupon: function () {
    var that = this
    var userid = wx.getStorageSync("userId")
    if (userid) {
      wx.navigateTo({
        url: '../peopleData/coupon/coupon?type=1',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    }

  },


  // 前往我的信息
  toPeopleInfo:function(){
    var that = this
    var userid = wx.getStorageSync("userId")
    if (userid) {
      wx.navigateTo({
        url: '../peopleData/peopleInfo/peopleInfo',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    }
  },
  // 前往收货地址
  toAddress: function () {
    var that = this
    var userid = wx.getStorageSync("userId")
    if (userid) {
      wx.navigateTo({
        url: '../peopleData/address/address',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    }
  },
  // 前往我的评价
  toMyEvaluation:function(){
    var that = this
    var userid = wx.getStorageSync("userId")
    if (userid) {
      wx.navigateTo({
        url: '../peopleData/myEvaluation/myEvaluation',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        image: "/images/errortip.png"
      })
    }
  },
  // 退出登录
  quitLogin: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认退出登录?',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorageSync()
          that.setData({
            userInfo: "",
            userType: "",
            orderNumber:'',
            shareData:''
          })
        }
      }
    })
  },

  // 前往我的拼团
  toGroupProduct:function(){
    var that=this
    var userid = wx.getStorageSync("userId")
    if (!userid){
      wx.showToast({
        title: '暂无登录',
        image: '/images/errortip.png'
      })
      return false
    }

    wx.navigateTo({
      url: '../system/groupProduct/groupProduct',
    })
  }
})