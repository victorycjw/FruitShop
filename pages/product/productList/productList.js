// pages/product/productSort/productSort.js
const productReq=require("../../../utils/productReq.js")
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
    var that=this
    var catId = options.catId
    that.setData({
      catId: catId
    })
    if (catId =="d31bff9748734aedb735f476c27fb944"){
      that.findProductByVip(catId)
      that.findProductVideo()
    }else{
      that.findProductByCategoryId(catId)
    }

  },

  // 获取美颜视频
  findProductVideo: function () {
    var that = this
    productReq.findProductVideo({}, function (res) {
      console.log("视频", res)
      that.setData({
        videoList: res.data.list
      })
    })
  },

  //获取分类信息 
  findProductByCategoryId:function(id){
    var that=this
    var formdata={
      categoryId:id
    }
    productReq.findProductByCategoryId(formdata,function(res){
      console.log("分类的商品信息",res)
      that.setData({
        proList:res.data.list,
        catData:res.data.obj
      })
    })
  },

  // 获取VIP产品
  findProductByVip: function (id) {
    var that = this
    var formdata = {
      categoryId: id
    }
    productReq.findProductByVip(formdata, function (res) {
      console.log("VIP", res)
      that.setData({
        proList: res.data.list,
        catData: res.data.obj
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

  // 跳转到商品详情
  toProductData: function (e) {
    console.log(e)
    var that=this
    var proId = e.currentTarget.dataset.id
    var catId = that.data.catId
    if (catId =='d31bff9748734aedb735f476c27fb944'){
      wx.navigateTo({
        url: '../productVIPData/productVIPData?proId=' + proId,
      })
    }else{
      wx.navigateTo({
        url: '../productData/productData?proId=' + proId,
      })
    }

  },
})