// pages/peopleData/address/address.js
const baseReq = require("../../../utils/baseReq.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['河南省','郑州市','中原区'],
    isdata:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      tab:options.tab
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
    var that=this 
    that.findUserAddress()
  },
  // 查询用户的收货地址
  findUserAddress:function(){
    var that=this
    var formdata={
      openid: wx.getStorageSync("wxOPENID")
    }
    baseReq.findUserAddress(formdata,function(res){
      console.log("地址list",res)
      var addressList = res.data.list
      if (addressList){
        that.setData({
          isdata:1
        })
      }else{
        that.setData({
          isdata: 0
        })
      }
      that.setData({
        addressList: addressList
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
  // 添加收货地址
  addUserAddress:function(e){
    var that=this
    var name = e.detail.value.name
    var phone = e.detail.value.phone
    var regionItem = that.data.regionItem
    var details = e.detail.value.details
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!name) {
      wx.showToast({
        title: '请输入姓名',
        image: "/images/errortip.png"
      })
      return false
    }
    if (!phone || phone.length < 11 || !reg.test(phone)) {
      wx.showToast({
        title: '手机号错误',
        image: "/images/errortip.png"
      })
      return false
    }
    if (!details) {
      wx.showToast({
        title: '请输入详细地址',
        image: "/images/errortip.png"
      })
      return false
    }
    if (!regionItem) {
      wx.showToast({
        title: '请选择省市区',
        image: "/images/errortip.png"
      })
      return false
    }
    wx.showLoading({
      title: '添加中...',
      mask: true
    })
    var user_info = wx.getStorageSync("userInfo")
    
    var formdata={
      userId: wx.getStorageSync("userId"),
      wxName: user_info.wxName,
      wxPic:user_info.wxPic,
      openid: wx.getStorageSync("wxOPENID"),
      name:name,
      phone: phone,
      address: regionItem[0] + regionItem[1] + regionItem[2] + details
    }
    baseReq.addUserAddress(formdata,function(res){
      wx.hideLoading()
      console.log(res)
      that.onShow()
    })
  },

  // 省市区选择
  regionChange:function(e){
    var that=this
    that.setData({
      regionItem: e.detail.value
    })
  },

  // 跳转新增
  AddToaddress:function(){
    var that=this
    console.log(1)
    that.setData({
      isdata:0
    })
  },
  // 删除地址
  deleteUserAddress:function(e){
    var that=this
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.showLoading({
      title: '删除中...',
      mask:true
    })
    var formdata={
      addressId:id
    }
    baseReq.deleteUserAddress(formdata,function(res){
      wx.hideLoading()
      if (res.data.returnCode==1){
        wx.showToast({
          title: '删除成功',
          image: "/images/righttip.png"
        })
        that.onShow()
      }else{
        wx.showToast({
          title: '异常',
          image: '/images/errortip.png'
        })
      }



    })
  },

  // 设置默认地址
  editUserAddressIsDefault:function(e){
    var that=this
    var id = e.currentTarget.dataset.id
    var formdata={
      openId: wx.getStorageSync("wxOPENID"),
      addressId:id
    }
    wx.showLoading({
      title: 'loading',
      mask: true
    })
    baseReq.editUserAddressIsDefault(formdata,function(res){
      console.log(res)
      that.onShow()
    })

  },

  // 使用此地址
  sureDefault: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var formdata = {
      openId: wx.getStorageSync("wxOPENID"),
      addressId: id
    }
    wx.showLoading({
      title: 'loading',
      mask: true
    })
    baseReq.editUserAddressIsDefault(formdata, function (res) {
      console.log(res)
      if (res.data.returnCode == 1) {
        wx.navigateBack({

        })
      } else {
        wx.showToast({
          title: '请重试',
          image: "/images/errortip.png"
        })
      }
    })
  },

})