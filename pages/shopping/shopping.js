// pages/shopping/shopping.js
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
    var carts = wx.getStorageSync("carts");
    console.log("carts:"+carts);
    if(carts.price==carts.oldprice){
      that.setData({
        carts:carts
      })
    }else{
      carts = [];
      that.setData({
        carts: carts
      })
    }
    that.totalnum(carts)
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

  // 订单确定
  toShoppingSure:function(){
    var that=this
    var price = that.data.price
    var number = that.data.number
    var userId = wx.getStorageSync("userId")
    if (!userId){
      wx.showToast({
        title: '请先登录',
        image: '/images/errortip.png'
      })
      return false
    }
    if(price!=0){
      wx.navigateTo({
        url: '../shoppingSure/shoppingSure?price=' + price + '&number=' + number+"&type=cart",
      })
    }else{
      wx.showToast({
        title: '未选择产品',
        image: '/images/errortip.png'
      })
    }
  },

  // 数量增加
  add:function(e){
    //console.log(e)
    var that=this
    var index = e.currentTarget.dataset.index
    var carts = that.data.carts
    if (carts[index].number < 999) {
      carts[index].number++;
      carts[index].total += Number(carts[index].price);
      console.log(carts[index].total)
      that.setData({
        carts: carts
      })
    }else{
      wx.showToast({
        title: '已达上限',
        image: '/images/errortip.png'
      })
    }
    that.totalnum(carts)
  },

  // 数量减少
  minus:function(e){
    console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var carts = that.data.carts;
    console.log(carts[index].number);
    console.log(carts[index].price);
    if (carts[index].number >1 ) {
      carts[index].number--;
      carts[index].total -= carts[index].price;
      that.setData({
        carts: carts
      })

    }else{
      wx.showToast({
        title: '已达下限',
        image: '/images/errortip.png'
      })
    }
    that.totalnum(carts)
  },

  // 选择框
  checkState:function(e){
    var that=this
    console.log(e)
    var index = e.currentTarget.dataset.index
    var carts = that.data.carts
    if (carts[index].checkState){
      console.log(1)
      carts[index].checkState = false
    }else{
      console.log(2)
      carts[index].checkState = true
    }
    that.setData({
      carts: carts
    })
    that.totalnum(carts)
    
  },


  // 删除物品
  deleteCarts:function(){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确认删除该商品？',
      success: function (res) {
        console.log(1)
        if (res.confirm) {
          var carts = that.data.carts
          for (var i = carts.length - 1; i >= 0; i--) {
            if (carts[i].checkState == true) {
              carts.splice(i, 1)
            }
          }
          that.setData({
            carts: carts
          })
          that.totalnum(carts)

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  // 计算数量及金额
  totalnum: function (carts) {
    var that = this
    var number = 0;
    var price = 0
    console.log(carts)
    for (var i = 0; i < carts.length; i++) {

      if (carts[i].checkState) {
        number = Number(number) + Number(carts[i].number)
        price = Number(price) + Number(carts[i].total)
      }
    }
    that.setData({
      number: number,
      price: price
    })
    wx.setStorage({
      key: 'carts',
      data: carts,
    })
    console.log(carts);
  }

})