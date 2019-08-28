// pages/peopleData/order/order.js
const app = getApp()
const orderReq = require("../../../utils/orderReq.js")
const baseReq = require("../../../utils/baseReq.js")
const loginReq = require("../../../utils/loginReq.js")
const moneyReq = require("../../../utils/moneyReq.js")
const maskLayer = require('../../../utils/xmls/maskLayer/maskLayer.js'); //遮罩
Page({ 
  jump(e){
    console.log(e)
  },
  /**
   * 页面的初始数据
   */
  data: {
    imgURL: app.globalData.imgURL,
    order_title: ['全部', '待付款','待分享','待发货','待收货'],
    payStyle: 1,

    // targetTime1: 0,
    // clearTimer: false,
    // myFormat1: ['天', '时', '分', '秒'],
    spellNo:"",
    userPic:'',
    orderCode:"",
    pcPic:[],
    spellPrice:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var tab = options.tab
    console.log(options)


    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log(res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
    var carts = wx.getStorageSync("carts");
    console.log(carts)
    
    var userId= wx.getStorageSync("userId");
    var userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo)
    that.setData({
      pcPic: that.data.pcPic
    })
    // console.log(userId)
    var address = wx.getStorageSync("saveadd");
    var phone = wx.getStorageSync("savephone");
    var wxName = userInfo.wxName;
    var num = wx.getStorageSync("num");

    that.setData({
      current: tab
    })
    that.findContact()
    // var start = wx.getStorageSync("startTime");
    // var end = wx.getStorageSync("endTime");
    
    // that.setData({
    //   targetTime1: new Date(end).getTime() 
    // });
  },

  // 获取联系我们信息
  findContact: function () {
    var that = this

    baseReq.findContact({}, function (res) {
      console.log("联系我们", res)
      that.setData({
        contactData:res.data.list
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  fenxiang(e){
    console.log(e)
    console.log(e.currentTarget.dataset.codeid)
    this.setData({
      codeid: e.currentTarget.dataset.codeid
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    that.findUserAllOrder()
    that.checkUserInfo()
  },

  // 获取人员信息
  checkUserInfo: function () {
    var that = this
    var formdata = {
      openid: wx.getStorageSync("wxOPENID"),
      userId: wx.getStorageSync("userId"),
    }
    loginReq.checkUserInfo(formdata, function (res) {
      console.log('checkuserinfo', res)
      var user_type = res.data.obj.userType
      wx.setStorageSync("userType", user_type)
      wx.setStorageSync("userInfo", res.data.obj)
      that.setData({
        userType: user_type,
        userInfo: res.data.obj
      })
    })
  },

  


  // 查询订单
  findUserAllOrder: function () {
    var that = this
    var formdata={
      openid: wx.getStorageSync("wxOPENID")
    }
    orderReq.findUserAllOrder(formdata, function (result) {
      console.log("查询所有订单", result)
      var orderList = result.data.list
      //获取订单并按照订单状态分订单
      var orders = new Array()
      console.log("orders",orders)
      orders[0] = orderList
      orders[1] = new Array()
      orders[2] = new Array()
      orders[3] = new Array() 
      orders[4] = new Array()
      orders[5] = new Array()
      if (orderList){
        for (var i = 0; i < orderList.length; i++) {

          if (orderList[i].state == 1 && (orderList[i].refundState == 1 || orderList[i].refundState == 4)) {
            orders[1].push(orderList[i])
          }
          else if (orderList[i].state == 6 && (orderList[i].refundState == 1 || orderList[i].refundState == 4)) {
            orders[2].push(orderList[i])
          }
          else if (orderList[i].state == 2 && (orderList[i].refundState == 1 || orderList[i].refundState == 4)) {
            orders[3].push(orderList[i])
          }
          else if (orderList[i].state == 3 && (orderList[i].refundState == 1 || orderList[i].refundState == 4)) {
            orders[4].push(orderList[i])
          }
          if (orderList[i].state == 4 || orderList[i].refundState == 3 || orderList[i].refundState == 4){
            orders[5].push(orderList[i])
          }
        }
      }
      
      that.setData({
        orders: orders
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
    // this.setData({
    //   clearTimer: true
    // });
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
  onShareAppMessage: function (res) {
    console.log("----------------------codeid---------------------")
    console.log(res.target.dataset.codeid)
    console.log(res.target.dataset.codeid)
    var pc=[];
    pc.push(this.data.pcPic)
    this.setData({
      codeid: res.target.dataset.codeid
    })
    return {
      title: '转发',
      path: '/pages/product/productData/productData?orderId=' + res.target.dataset.codeid + '&pcPic=' + pc ,
      imageUrl:"/images/mine/gongsi",
      success: function (res) { }
    }
  },
  // swiper切换
  changeTitle: function (e) {
    var that = this
    var index = e.currentTarget.dataset.id
    console.log(e)
    that.setData({
      current: index
    })
  },
  changeSwiper: function (e) {
    var that = this
    var current = e.detail.current
    that.setData({
      current: current
    })
  },

  // 联系我们
  callMe:function(){
    var that=this
    wx.makePhoneCall({
      phoneNumber: that.data.contactData[0].phone,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 取消待付款订单
  cancelOrder:function(e){ 
    var that=this
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log(id)
    var formdata={
      id:id,
      
    }
    orderReq.cancelOrder(formdata,function(res){
      console.log("取消订单",res)
      if (res.data.returnCode == 1) {
        wx.showToast({
          title: '取消成功',
          image: '/images/righttip.png'
        })
        that.onShow()
      } else {
        wx.showToast({
          title: '异常',
          image: '/images/errortip.png'
        })
      }
    })
  },

  // 确认收货
  updateOrderStateRecipient:function(e){
    var that=this
    console.log(e)
    var orderid = e.currentTarget.dataset.orderid
    var formdata={
      orderId: orderid
    }
    wx.showLoading({
      title: '收货中...',
      mask: true
    })
    orderReq.updateOrderStateRecipient(formdata,function(res){
      console.log("确认收货",res)
      if (res.data.returnCode==1){
        wx.showToast({
          title: '收货成功',
          image: '/images/righttip.png'
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



  // 订单详情
  toOrderData:function(e){
    var that=this
    var item = e.currentTarget.dataset.item
    console.log(e)
    console.log(item);
    
    that.setData({
      productId: item.pro_list[0].productId,
      orderid: item.id
    })


    var address = wx.getStorageSync("saveadd");
    var phone = wx.getStorageSync("savephone");
    var wxName = that.data.userInfo.wxName;

    // 获取拼单信息
    
        wx.request({
          url: app.globalData.API_URL + "/appSpell/selectSpellInfo",
          method: "GET",
          data: {
            orderId: item.id
          },
          success: (res) => {
            console.log(res)
            var arr = [];
            for (var i = 0; i < res.data.list.length; i++) {
              arr.push(res.data.list[i].wxPic);
              that.setData({
                pcPic: arr,
                res
              })

            }
            console.log(that.data.pcPic)
            var jsonObject = JSON.stringify(item)
            wx.navigateTo({
              url: '/pages/peopleData/orderData/orderData?jsonObject=' + jsonObject + '&codeid=' + item.id + '&pcPic=' + that.data.pcPic
            })
          }

        })

    
  },

  // 去评价
  toEvaluate:function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var current = that.data.current
    var orderData = that.data.orders[current][index]
    var jsonObject = JSON.stringify(orderData)
    wx.navigateTo({
      url: '../evaluate/evaluate?jsonObject=' + jsonObject,
    })
  },





  // 显示遮罩层
  showPay: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    console.log(index,"index")
    var payMoney = e.currentTarget.dataset.money
    var checkOrderId = that.data.orders[that.data.current][index].id
    console.log(e)
    maskLayer.showModal(that)
    that.setData({
      showPay: true,
      payMoney: payMoney,
      checkOrderId: checkOrderId
    })
  },
  // 隐藏遮罩
  hideModal: function () {
    var that = this
    that.setData({
      showPay: false, 
      refundStyle: false,
    })
    maskLayer.hideModal(that)
  },


  // 选择支付方式
  // choosePayClass: function (e) {
  //   console.log(e)
  //   var that = this
  //   var payStyle = e.currentTarget.dataset.types
  //   var price = that.data.price.toFixed(2)
  //   var userInfo = that.data.userInfo
  //   var payMoney = that.data.payMoney
  //   if (payStyle == 2 && userInfo.balance < payMoney) {
  //     wx.showToast({
  //       title: '余额不足',
  //       image: '/images/errortip.png'
  //     })
  //   } else if (payStyle == 3 && userInfo.dibs < payMoney) {
  //     wx.showToast({
  //       title: '零钱不足',
  //       image: '/images/errortip.png'
  //     })
  //   } else {
  //     that.setData({
  //       payStyle: payStyle
  //     })
  //   }
    
  // },

  // 支付
  Pay: function (e){
    var that=this
    var userInfo = that.data.userInfo

    var that = this
    var index = e.currentTarget.dataset.index
    console.log(index, "index")
    var payMoney = e.currentTarget.dataset.money
    var checkOrderId = that.data.orders[that.data.current][index].id
    console.log(e)
    maskLayer.showModal(that)
    that.setData({
      showPay: true,
      payMoney: payMoney,
      checkOrderId: checkOrderId
    })


    var orderId = that.data.checkOrderId
    var formdata = {
      userId: userInfo.userId,
      openid: userInfo.openid,
      orderId: that.data.checkOrderId,
      paystyle: that.data.payStyle,
      appId: app.globalData.APP_ID,
      mchId: app.globalData.mchId,
      mchKey: app.globalData.mchKey,
    }
    wx.showLoading({
      title: '支付中...',
      mask:true
    })
    moneyReq.payOrder(formdata, function (res) {
      console.log('支付', res)  

      
      if (that.data.payStyle == 1) {
        wx.requestPayment({
          timeStamp: res.data.map.timeStamp,
          nonceStr: res.data.map.nonceStr,
          package: res.data.map.package,
          signType: "MD5",
          paySign: res.data.map.paySign,
          success: function (rescus) {
            console.log("支付", rescus)
            that.updateOrderWxPaySuccess(orderId)
    
            that.hideModal()
          },
          fail: function () {
            wx.hideLoading()
            wx.showToast({
              title: '支付失败！',
              image: "/images/errortip.png"
            })
          }
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '支付成功！',
        })
        that.onShow()
        that.hideModal()
      }
    })
  },

  // 微信支付更新订单状态
  updateOrderWxPaySuccess: function (orderId) {
    var that = this
    var formdata = {
      orderId: orderId
    }
    wx.hideLoading()
    orderReq.updateOrderWxPaySuccess(formdata, function (res) {
      console.log(res)
      wx.showToast({
        title: '支付成功！',
        image: '/images/righttip.png'
      })
      that.onShow()
    })
  },

  showRefundStyle:function(e){
    var that = this
    var orderId = e.currentTarget.dataset.orderid
    maskLayer.showModal(that)
    that.setData({
      refundStyle: true,
      checkOrderId: orderId
    })
  },
  // 退款申请
  saveOrderRefund:function(e){
    var that=this
    var userInfo = that.data.userInfo

    var formdata={
      userId: userInfo.userId,
      userName: userInfo.wxName,
      userType: userInfo.userType,
      orderId: that.data.checkOrderId,
      refundReason: e.detail.value.refundReason
    }

    orderReq.saveOrderRefund(formdata,function(res){
      console.log('退款申请',res)
      if (res.data.returnCode==1){
        wx.showToast({
          title: '申请成功',
          image: '/images/righttip.png'
        })
        that.onShow()
        that.hideModal()
      }else{
        wx.showToast({
          title: '申请失败',
          image: '/images/errortip.png'
        })
      }
    })
  }
  
})