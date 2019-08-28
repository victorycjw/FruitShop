// pages/peopleData/evaluate/evaluate.js
const productReq = require("../../../utils/productReq.js")
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
  onLoad: function(options) {
    var that = this
    var order = JSON.parse(options.jsonObject)
    var proList = order.pro_list
    for (var i = 0; i < proList.length; i++) {
      proList[i].fabuState = 1
    }
    that.setData({
      order: order,
      proList: proList
    })
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

  },

  //选择图片
  chooseImg: function(e) {
    var that = this
    wx.chooseImage({
      count: 9,
      success: function(res) {
        that.setData({
          chooseImgs: res.tempFilePaths
        })
      },
    })
  },

  postEvaluate: function(e) {
    var that = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    var postform = e.detail.value
    if (!postform.title) {
      wx.showToast({
        title: '填写评论信息',
        image: '/images/errortip.png'
      })
    } else {
      if (postform.switch) {
        var anonymous = 1
      } else {
        var anonymous = 2
      }
      wx.showLoading({
        title: '评论中...',
        mask: true
      })
      var proData = that.data.proList[index]
      var user_info = wx.getStorageSync("userInfo")
      var formdata = {
        userId: wx.getStorageSync("userId"),
        openid: wx.getStorageSync("wxOPENID"),
        userName: user_info.wxName,
        userPic: user_info.wxPic,
        toId: proData.productId,
        toName: proData.productName,
        toPic: proData.productPic,
        title: postform.title,
        anonymous: anonymous,
        orderId: that.data.order.id
      }
      productReq.saveComment(formdata, function(res) {
        console.log("评论", res)
        var commentId = res.data.obj.id
        var chooseImgs = that.data.chooseImgs
        if (chooseImgs) {
          that.uploadPic(commentId, chooseImgs)
        } 
        wx.hideLoading()
        console.log(22)
        wx.showModal({
          title: '评论',
          content: '评论成功',
          showCancel: false,
          success: function(res1) {
            // wx.redirectTo({
            //   url: '../order/order?id=4',
            // })
            if (res1.confirm) {
              console.log(111)
              var proList = that.data.proList
              proList[index].fabuState = 0
              that.setData({
                proList: proList,
                chooseImgs:''
              })
              console.log(proList)
              var fabustate = 0
              for (var i = 0; i < proList.length; i++) {
                if (proList[i].fabuState == 1) {
                  fabustate++
                }
              }
              if (fabustate == 0) {
                wx.redirectTo({
                  url: '../order/order?tab=4',
                })
              }

            }
          },
        })

        

      })

    }
  },

  // 上传图片 appuserbase/uploadCommentPic
  uploadPic: function(commentId, imageList) {
    var that = this
    for (var i = 0; i < imageList.length; i++) {
      wx.uploadFile({
        url: app.globalData.API_URL + '/appuserbase/uploadCommentPic',
        filePath: imageList[i],
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          commentId: commentId,
          sort: i
        },
        success: function(res) {
          console.log("上传多张图片", res)
        },
        fail: function(res) {
          console.log("上传失败")
        }
      })
    }

  },
})