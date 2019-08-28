// pages/shoppingSure/shoppingSure.js
const app = getApp()
const maskLayer = require('../../utils/xmls/maskLayer/maskLayer.js'); //遮罩
const baseReq = require("../../utils/baseReq.js")
const orderReq = require('../../utils/orderReq.js')
const loginReq = require("../../utils/loginReq.js")
const moneyReq = require("../../utils/moneyReq.js")
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    imgURL: app.globalData.imgURL,
    payStyle:1,
    receiveType:1,
    receiveList:['快递','自提货']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options);
    var type = options.type;
    var carts = null;
    console.log(type)
    if(type == "cart"){
      carts = wx.getStorageSync("carts")
    } else if (type == "pintuan"){
      carts = wx.getStorageSync("pintuan")
    }
  
    console.log(carts);
    that.setData({
      carts: carts,
      price: options.price,
      number: options.number,
      userId: wx.getStorageSync("userId"),
      openid: wx.getStorageSync("wxOPENID")
    })
    console.log(carts);
    
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
    that.findUserDefaultAddress()
    that.checkUserInfo();
    // var addOrder=that.addOrder;
    // wx.removeStorage({
    //   key: 'addOrder',
    // }) 
    
  },

  checkUserInfo:function(){
    var that=this
    var formdata={
      openid: wx.getStorageSync("wxOPENID"),
      userId: wx.getStorageSync("userId"),
    }
    loginReq.checkUserInfo(formdata,function(res){
      console.log("用户信息",res)
      that.setData({
        userInfo:res.data.obj
      })
    })

  },


  // 查看收货地址
  findUserDefaultAddress:function(){
    var that=this
    var formdata={
      openid: wx.getStorageSync("wxOPENID")
    }
    baseReq.findUserDefaultAddress(formdata,function(res){
      console.log(res)

      wx.setStorageSync("saveadd", res.data.obj.address)
      console.log(res.data.obj.address)
      
      
      wx.setStorageSync("savephone", res.data.obj.phone)
      wx.setStorageSync("savename", res.data.obj.name)
      
      that.setData({
        addressData:res.data.obj
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
    var that = this;
    var carts = that.data.carts;
    // if (carts[0].isSpell == 1) {
    //         wx.removeStorage({
    //           key: 'pintuan',
    //           success: function (res) {
    //             console.log(res);
    //           }
    //         })
    // }
      
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
  showPay:function(){
    var that = this
    maskLayer.showModal(that)
    that.setData({
      showPay: true
    })
  },

  
  // 隐藏遮罩
  hideModal: function () {
    var that = this
    that.setData({
      showPay: false,
    })
    maskLayer.hideModal(that)
  },

  // 前往地址页
  toAddress:function(){
    wx.navigateTo({
      url: '../peopleData/address/address?tab=1',
    })
  }, 
  // 选择支付方式
  choosePayClass:function(e){
    console.log(e)
    var that=this
    var payStyle = e.currentTarget.dataset.types
    var price = that.data.price
    var userInfo = that.data.userInfo
   
    if (payStyle == 2 &&userInfo.balance < price){
      wx.showToast({
        title: '余额不足',
        image: '/images/errortip.png'
      })
    } else if (payStyle == 3 && userInfo.dibs < price) {
      wx.showToast({
        title: '零钱不足',
        image: '/images/errortip.png'
      })
    }else{
      that.setData({
        payStyle: payStyle
      })
    }
  },

  // 买家留言
  sureInput:function(e){
    var that = this
    that.setData({
      remark: e.detail.value
    })
  },

  // 保存订单
  addOrder:function(){
    var that=this
    var addressData = that.data.addressData;
    console.log(addressData.name);
    console.log(addressData.phone);
    var carts = that.data.carts
    
    var cartList=[]
    if (!addressData){
      wx.showToast({
        title: '未选择收货地址',
        image: '/images/errortip.png'
      })
      return false
    }

    wx.showLoading({
      title: '支付中...',
      mask: true
    })
    
    for (var i = 0; i < carts.length;i++){
        if (carts[i].checkState) {
          console.log(carts);
          console.log(carts[i]);
          cartList.push(carts[i])
        }
    }
    console.log(cartList)
    var userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo.wxName);
    console.log(userInfo.wxPic);
    
    
    var formdata={
      userId: that.data.userId,
      openid: that.data.openid,
      wxName: userInfo.wxName,
      wxPic: userInfo.wxPic,
      number: that.data.number,
      price: that.data.price,
      receiver: addressData.name,
      address: addressData.address,
      phone: addressData.phone,
      carts: cartList,
      //添加了是否是拼团商品
      // receiveMode: that.data.receiveType,
      remark: that.data.remark ? that.data.remark:'',
      isvip:2,
      vipShop:2
      // coupon: that.data.couponItem ? that.data.couponItem.id:''
    }
    orderReq.buildeOrderInfo(formdata,function(result){
      console.log("保存订单", result)
      
      if (result.data.returnCode==1){
        var orderId = result.data.obj.id
 

        /*带支付 */
        var formdata={
          userId: that.data.userId,
          openid: that.data.openid,
          orderId: orderId,
          paystyle: that.data.payStyle,
          appId: app.globalData.APP_ID,
          mchId: app.globalData.mchId,
          mchKey: app.globalData.mchKey,
        }
        moneyReq.payOrder(formdata,function(res){
          console.log('支付',res)
          wx.hideLoading()
          if (res.data.returnCode==1){
            if (that.data.payStyle==1){
              
              wx.requestPayment({
                timeStamp: res.data.map.timeStamp,
                nonceStr: res.data.map.nonceStr,
                package: res.data.map.package,
                signType: "MD5",
                paySign: res.data.map.paySign,
                success: function (rescus) {
                  console.log("支付", rescus)
                  that.updateOrderWxPaySuccess(orderId)

                },
                fail: function () {
                  wx.showModal({
                    title: '支付',
                    content: '支付失败，是否前往待付款支付？',
                    success: function (res) {
                      if (res.confirm) {
                        wx.switchTab({
                          url: '../people/people',
                        })
                      }
                      if(res.cancel){
                        wx.switchTab({
                          url: '../index/index',
                        })
                      }
                    }
                  })
                }
              })
            }else{
              wx.showModal({
                title: '支付',
                content: '支付成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }
                }
              })

            }
            that.clearShopping()

          } else if (res.data.returnCode == 2){
            wx.showToast({
              title: '金额不足',
              image: '/images/errortip.png'
            })
            wx.switchTab({
              url: '../index/index',
            })
          }else{
            wx.showToast({
              title: '异常',
              image: '/images/errortip.png'
            })
          }
        })
      }else{
        wx.showToast({
          title: result.data.returnStr,
          image: '/images/errortip.png'
        })
      }


    })
  },

  // 微信支付更新订单状态
  updateOrderWxPaySuccess:function(orderId){
    var that=this
    var formdata={
      orderId: orderId
    }
    orderReq.updateOrderWxPaySuccess(formdata,function(res){
      console.log(res)
      wx.showModal({
        title: '支付',
        content: '支付成功',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
      that.clearShopping()

    })
  }, 


  // 前往优惠卷
  toCoupon:function(){
    var that=this
    wx.navigateTo({
      url: '../peopleData/coupon/coupon?ordermoney=' + that.data.price,
    })
  },

  // 清除购物车缓存
  clearShopping:function(){
    var carts = wx.getStorageSync("carts")
    for (var i = carts.length - 1; i >= 0; i--) {
      if (carts[i].checkState == true) {
        carts.splice(i, 1)
      }
    }
    console.log(carts)

    wx.setStorage({
      key: 'carts',
      data: carts,
    })
  },
  
  bindReceiveChange:function(e){
    var that=this
    var receiveType = Number(e.detail.value)+1
    that.setData({
      receiveType: receiveType
    })
  }
})