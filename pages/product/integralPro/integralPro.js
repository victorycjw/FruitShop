// pages/product/productData/productData.js
const maskLayer = require('../../../utils/xmls/maskLayer/maskLayer.js'); //遮罩
const productReq = require("../../../utils/productReq.js")
const WxParse = require("../../../utils/wxParse/wxParse.js")
const app = getApp()
var num
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
    var proId=options.proId
    num=1
    var that = this
    that.setData({
      proId: proId,
      num: num
    })
    that.findProductInfo(proId)
    that.findCommentByProductId(proId)
  },

  findProductInfo: function (id){
    var that=this
    var userId = wx.getStorageSync("userId") ? wx.getStorageSync("userId"):''
    var formdata={
      id: id,
      userId: userId
    }
    productReq.findProductInfo(formdata,function(res){
      console.log("商品详情",res)
      that.setData({
        proData:res.data.map.product,
        proSpecList: res.data.map.productSpec,
        collect: res.data.map.collect
      })

      WxParse.wxParse('article', 'html', res.data.map.product.details, that, 5);
    })
  },

  // 商品评价
  findCommentByProductId: function (proId) {
    var that = this
    var formdata = {
      toId: proId,
      page: 1,
      rows: 10
    }
    productReq.findCommentByProductId(formdata, function (res) {
      console.log('商品评价', res)
      that.setData({
        myEvaluate:res.data
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

  // 显示遮罩层
  showSpecification: function (e) {
    var that = this
    console.log(e)
    maskLayer.showModal(that)
    that.setData({
      showSpecification: true,
      buttonType: e.currentTarget.dataset.name
    })
  },


  // 隐藏遮罩
  hideModal: function () {
    var that = this
    that.setData({
      showSpecification: false,
    })
    maskLayer.hideModal(that)
  },

  // 商品数量与减少
  add: function () {
    var that=this
    if (num < 999) {
      num += 1
      that.setData({
        num: num
      })
    } else {
      wx.showToast({
        title: '超过上限了',
        image: '/images/errortip.png'
      })
    }
  },
  minus: function () {
    var that = this
    if (num > 1) {
      num -= 1
      that.setData({
        num: num
      })
    } else {
      wx.showToast({
        title: '超过下限了',
        image: '/images/errortip.png'
      })
    }
  },

  inputnumber: function (e) {
    var that = this

    num = Number(e.detail.value)
    if (num > 0) {
      that.setData({
        num: num
      })

    }else{
      wx.showToast({
        title: '填写错误',
        image:'/images/errortip.png'
      })
    }
  },

  // 规格选择
  specListChange:function(e){
    var that=this
    var specIndex=e.detail.value
    var proSpecList = that.data.proSpecList
    that.setData({
      proSpecItem: proSpecList[specIndex],
      specIndex: specIndex
    })
  },
  // 收藏
  saveCollect:function(){
    var that=this
    var user_info = wx.getStorageSync("userInfo")
    var userId = wx.getStorageSync("userId")
    var wxOPENID = wx.getStorageSync("wxOPENID")
    var proData = that.data.proData
    var formdata={
      userId: userId,
      userName: user_info.wxName,
      userPic: user_info.wxPic,
      userOpenid: wxOPENID,
      toCollectId: proData.id,
      toCollectName: proData.name
    }
    productReq.saveCollect(formdata,function(res){
      console.log("收藏",res)
      that.findProductInfo(that.data.proId)
    })
  },
  // 取消收藏
  removeCollect:function(){
    var that=this
    var wxOPENID = wx.getStorageSync("wxOPENID")
    var formdata={
      userOpenid: wxOPENID,
      toCollectId: that.data.proId
    }
    productReq.removeCollect(formdata,function(res){
      console.log("取消收藏",res)
      that.findProductInfo(that.data.proId)
    })
  },

  addCarts:function(){
    var that = this
    var proSpecItem = that.data.proSpecItem
    var proData = that.data.proData
    var number=that.data.num
    var userId = wx.getStorageSync("userId")
    if (!userId) {
      wx.showToast({
        title: '请先登录',
        image: '/images/errortip.png'
      })
      return false
    }
    if (!proSpecItem){
      wx.showToast({
        title: '先选择规格',
        image: '/images/errortip.png'
      })
    }else{
      var proList={
        productId: proData.id,
        productName: proData.name,
        productPic: proData.smallPic,
        productSpecId: proSpecItem.id,
        productSpecName: proSpecItem.specName,
        price: Number(proSpecItem.specPrice)*5,
        number: number,
        total: Number(proSpecItem.specPrice) * Number(number) * 5,
      }
      var jsonObject = JSON.stringify(proList)
      wx.navigateTo({
        url: '../integralSure/integralSure?jsonObject=' + jsonObject,
      })
      // var carts = wx.getStorageSync('carts')
      // if (!carts) {
      //   carts = []
      // }
      // console.log(carts)
      // console.log(proData.id)
      //   var result = 0
      //   var resultj = -1
      //   for (var j = 0; j < carts.length; j++) {
      //     var ooo = carts[j].productId == proData.id
      //     var iii = carts[j].productSpecId == proSpecItem.id
      //     console.log(ooo,iii)
      //     if (ooo && iii) { /* 购物车有此商品*/
      //       result = 1
      //       resultj = j
      //     }
      //   }

      //   if (resultj != -1) {
      //     wx.showToast({
      //       title: '存在此商品',
      //       image: '/images/errortip.png'
      //     })
      //   } else {
      //     carts.push({
      //       checkState: true,
      //       productId: proData.id,
      //       productName: proData.name,
      //       productPic: proData.smallPic,

      //       productSpecId: proSpecItem.id,
      //       productSpecName: proSpecItem.specName,

      //       price: proSpecItem.specPrice,
      //       number: number,
      //       total: Number(proSpecItem.specPrice) * Number(number),

      //     })
      //     if (that.data.buttonType =="shopping"){
      //       wx.switchTab({
      //         url: '../../shopping/shopping',
      //       })
      //     }else{
      //       wx.showToast({
      //         title: '加入购物车',
      //       })

      //     }
          
      //   }
      }
      // wx.setStorageSync("carts", carts)
      
    
  },
  
})