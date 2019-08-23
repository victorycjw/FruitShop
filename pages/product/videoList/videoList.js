// pages/product/videoList/videoList.js
const productReq=require('../../../utils/productReq.js')
const loginReq = require("../../../utils/loginReq.js")
const app=getApp()

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
    that.findProductVideo()
  },

  // 获取美颜视频
  findProductVideo:function(){
    var that=this
    productReq.findProductVideo({}, function (res){
      console.log("视频",res)
      that.setData({
        videoList:res.data.list
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
    var that=this
    if (wx.getStorageSync("wxOPENID")){
      that.checkUserInfo()
    }
    
  },

  checkUserInfo: function () {
    var that = this
    var formdata = {
      openid: wx.getStorageSync("wxOPENID"),
      userId: wx.getStorageSync("userId"),
    }
    loginReq.checkUserInfo(formdata, function (res) {
      console.log("用户信息", res)
      that.setData({
        userInfo: res.data.obj
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
  // 播放视频并监听是否支付
  findUserVideoIsExchange:function(e){
    var that=this
    console.log(e)
    
    var userId = wx.getStorageSync("userId")
    var userInfo = that.data.userInfo
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    if (!userId){
      wx.showToast({
        title: '请先登录',
        image: '/images/errortip.png'
      })
      return false
    }
    if (item.needIntegral==0){
      that.editVideoTapNum(item.id, index)
      return false
    }

    console.log(item)
    var formdata={
      userId: userId,
      videoId: item.id
    }
    productReq.findUserVideoIsExchange(formdata,function(res){
      console.log(res)
      if (res.data.returnCode==-1){

        wx.showModal({
          title: '视频兑换',
          content: '该视频需要' + item.needIntegral+'积分兑换，是否兑换？',
          success:function(result){
            if(result.confirm){
              var formdata={
                userId: userId,
                openid: userInfo.openid,
                wxName: userInfo.wxName,
                wxPic: userInfo.wxPic,
                videoId: item.id,
                videoTitle: item.title,
                videoCover: item.cover,
                videoIntegral: item.needIntegral
              }
              that.payIntegralVideo(formdata, item.id,index)
            }
          }
        })
      }else{
        that.editVideoTapNum(item.id,index)
        var videoList = that.data.videoList
        // videoList[index].
 
      }
    })

  },

  // 兑换积分视频
  payIntegralVideo: function (formdata, id, index){
    var that=this
    productReq.payIntegralVideo(formdata,function(res){
      console.log(res)
      if (res.data.returnCode==1){
        that.editVideoTapNum(id, index)
      }else{
        wx.showToast({
          title: '兑换失败！',
          image: '/images/errortip.png'
        })
      }
    })
  },

  // 播放视频并增加播放量
  editVideoTapNum:function(id,index){
    var that=this
    var formdata={
      id:id
    }
    that.setData({
      videoIndex: index
    })
    productReq.editVideoTapNum(formdata,function(res){
      console.log("增加播放量",res)
      var videoList = that.data.videoList
      videoList[index].tapNum++
      that.setData({
        videoList: videoList
      })
    })
  }
})