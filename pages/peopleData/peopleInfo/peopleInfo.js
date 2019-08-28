// pages/peopleData/peopleInfo/peopleInfo.js
const loginReq = require("../../../utils/loginReq.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArray: [
      {
        id: 2,
        name: "女"
      },
      {
        id: 1,
        name: '男'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openid = wx.getStorageSync("wxOPENID")
    that.checkUserInfo(openid)
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

  checkUserInfo: function (openid) {
    var that = this
    var formdata = {
      openid: openid,
      userId: wx.getStorageSync("userId"),
    }
    loginReq.checkUserInfo(formdata, function (res) {
      console.log('checkuserinfo', res)
      var user_type = res.data.obj.userType
      wx.setStorageSync("userType", user_type)
      if (res.data.obj.sex!=3){
        var sexindex=res.data.obj.sex
      }
      that.setData({
        userType: user_type,
        userInfo: res.data.obj,
        sexindex: sexindex
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
  ChangeSex: function (e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      sexindex: e.detail.value
    })
  },
  // 提交信息
  completeuser:function(e){
    var that=this
    var formdata=e.detail.value
    var sexindex = that.data.sexindex
    console.log(formdata)
    if (!formdata.name){
      wx.showToast({
        title: '姓名为空',
        image: "/images/errortip.png"
      })
      return false
    }
    if (!formdata.phone || formdata.phone.length!=11){
      wx.showToast({
        title: '手机号错误',
        image: "/images/errortip.png"
      })
      return false
    }
    if (!sexindex){
      wx.showToast({
        title: '选择性别',
        image: "/images/errortip.png"
      })
      return false
    }
    formdata.sex = that.data.sexArray[sexindex].id
    formdata.userId = that.data.userInfo.userId
    wx.showLoading({
      title: '提交中...',
      mask: true
    })
    loginReq.editDetailInfo(formdata,function(res){
      console.log(res)
      wx.hideLoading()
      if (res.data.returnCode==1){
        wx.showToast({
          title: '提交成功！',
          image: '/images/righttip.png'
        })
        
        // wx.switchTab({
        //   url: '../../people/people',
        // })
      }else{
        wx.showToast({
          title: '提交异常',
          image: "/images/errortip.png"
        })
      }
    })

  }
})