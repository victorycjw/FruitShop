var util = require("../../utils/util.js")
var baseReq = require("../../utils/baseReq.js")
const loginReq = require("../../utils/loginReq.js")
var productReq = require("../../utils/productReq.js")
var moneyReq = require("../../utils/moneyReq.js")
var maskLayer = require('../../utils/xmls/maskLayer/maskLayer.js'); //遮罩
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
    var that=this
    console.log("ops",options)
    var bossId=options.bossId
    // that.getNewUserCoupon()
    that.findsilde()

    that.getVipGiftBagTop3()
    that.getCategroyAll()
    that.findMessage()
    wx.setStorageSync("bossId", bossId)

    var openid = wx.getStorageSync("wxOPENID")
    if (openid) {
      that.checkUserInfo(openid)
    }
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
      wx.setStorageSync("userInfo", res.data.obj)
      that.setData({
        userType: user_type,
        userInfo: res.data.obj
      })
    })
  },


  //拼团商品
  // bookCommo:function(e){
  //   wx.navigateTo({
  //     url:"/pages/product/productData/productData"
  //   });
  // },


  // 查询是否领取优惠卷
  getNewUserCoupon:function(){
    var that=this
    util.getOpenId(function(res){
      var data = JSON.parse(res.data.data)
      console.log("openid", data)
      var openid = data.openid
      var formdata={
        openid: openid
      }
      // -1 未注册  1未领取 2已领取
      moneyReq.getNewUserCoupon(formdata,function(res){
        console.log("优惠卷",res)
        if (res.data.returnCode == -1 || res.data.returnCode == 1){
          maskLayer.showModal(that)
          that.setData({
            showCoupon:true,
            openid: openid
          })
        }else{

        }
      })
    })
  },

  // 隐藏遮罩
  hideModal: function () {
    var that = this
    that.setData({
      showCoupon: false,
    })
    maskLayer.hideModal(that)
  },

  // 登录并领取优惠卷
  loginToCoupon:function(e){
    var that = this
    wx.showLoading({
      title: 'loading',
      mask: true
    })
    var userInfo = e.detail.userInfo
    wx.setStorageSync("user_info", e.detail.userInfo)
    var bossId = wx.getStorageSync("bossId")
    util.getOpenId(function (res) {
      var data = JSON.parse(res.data.data)
      console.log(data)
      wx.setStorageSync("wxOPENID", data.openid)

      var formdata = {
        openid: data.openid,
        wxName: userInfo.nickName,
        wxPic: userInfo.avatarUrl,
        bossId: bossId ? bossId : ''
      }

      loginReq.adduser(formdata, function (rc) {
        console.log("授权登录", rc)
        wx.hideLoading()

        if (rc.data.returnCode == 1 || rc.data.returnCode == 0) {
          that.setData({
            userInfo: rc.data.obj,
            openid: data.openid,

          })
          wx.setStorageSync("userId", rc.data.obj.userId)
          wx.setStorageSync("userType", rc.data.obj.userType)
          wx.setStorageSync("userInfo", rc.data.obj)
          that.addUserCoupon(rc.data.obj.userId)

        } else {
          wx.showToast({
            title: '授权登录失败!',
            image: "/images/errortip.png"
          })
        }
      })
    })
  },

  // 领取优惠卷
  addUserCoupon:function(userId){
    var that=this
    var formdata={
      userId: userId
    }
    moneyReq.addUserCoupon(formdata,function(res){
      console.log("领取",res)
      if (res.data.returnCode==1){
        wx.showToast({
          title: '领取成功',
          image: "/images/righttip.png"
        })
        that.hideModal()
      }else{
        wx.showToast({
          title: '领取失败',
          image: "/images/errortip.png"
        })
      }
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
    var that=this
    that.getHomeProduct()

  },

  // 轮播图
  findsilde:function(){
    var that=this
    baseReq.findsilde({},function(res){
      that.setData({
        sildeList:res.data.list
      })
    })
  },

  // 商品分类
  getCategroyAll:function(){
    var that=this
    productReq.getCategroyAll({},function(res){
      that.setData({
        CategroyAllList:res.data.list
      })
    })
  },

  // 热门商品
  getHomeProduct:function(){
    var that=this
    productReq.getHomeProduct({},function(res){
      console.log(res.data.list);
      that.setData({
        homeProList:res.data.list
      })

      for (var i = 0; i < res.data.list.length; i++) {
        if (res.data.list[i].isSpell == 1) {
          var startTime = res.data.list[i].spellBeginDate;
          var endTime = res.data.list[i].spellEndDate;
          var num = res.data.list[i].spellNum
          wx.setStorageSync("startTime", startTime);
          wx.setStorageSync("endTime", endTime);
          wx.setStorageSync("num", num)
        }
      }
    })
    
  },
  
  // VIP套餐
  getVipGiftBagTop3: function () {
    var that = this
    productReq.getVipGiftBagTop3({}, function (res) {
      console.log(res)
      that.setData({
        VipGiftList: res.data.list
      })
    })
  },

  login: function(e) {
    var that = this
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      return false
    }
    wx.showLoading({
      title: '登录中...',
      mask: true,
      success: function(res) {},
    })
    that.hideModalAuto()

    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function(res) {
        console.log(res)
        wx.setStorageSync("wxInfo", res.userInfo)
        /* wx.login({
          success: function(rrr) { */
        util.getOpenId(function(r) {
          console.log("openid:" + r.data.openid)
          wx.setStorageSync("wxOPENID", r.data.openid)
          //插入用户信息
          pro_req.addUserInfo({
            SYS_CODE: app.globalData.SYS_CODE,
            INVITER: wx.getStorageSync("inviter"),
            MEMBERSHIP_LEVEL: 0,
            OPENID: r.data.openid,
            MEMBERSHIP_NICKNAME: res.userInfo.nickName,
            MEMBERSHIP_PIC: res.userInfo.avatarUrl,
            MEMBERSHIP_CODE: 'vip0',
            MEMBERSHIP_LEVEL: '0',
            USER_TYPE: 'app',
            PERSONAGE: 1,
            SYS_CODE: app.globalData.SYS_CODE
          }, function(res) {
            console.log("注册成功", res)
            wx.hideLoading()
            if (res.data.user_data) {
              wx.showModal({
                title: '登录成功！',
                showCancel: false,
                cancelColor: '#FF8040',
                success: function() {
                  wx.setStorageSync("userId", res.data.user_data.USER_ID)
                  wx.setStorageSync("user_info", res.data.user_data)
                  that.onShow()
                },
              })
            } else {
              that.showLogin()
            }

          })
        })
      },

    })
    /*  },
   }) */
  },



  topay: function() {
    var that = this
    wx.showLoading({
      title: '正在发起支付',
      mask: true
    })
    that.hideModalAuto()
    wx.request({
      url: `${app.globalData.API_URL}/appwx/postBilling`,
      data: {
        appId: `${app.globalData.APP_ID}`,
        mchId: `${app.globalData.mchId}`, //商户号
        mchKey: `${app.globalData.mchKey}`, //商户秘钥
        desc: `${app.globalData.desc}`, //商户名称
        openId: wx.getStorageSync("wxOPENID"),
        totalAmount: that.data.rechareItem.money //总金额
      },
      success: function(res) {
        console.log('支付', res)
        //去支付
        wx.hideLoading()
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonce_str,
          package: 'prepay_id=' + res.data.prepay_id,
          signType: 'MD5',
          paySign: res.data.sign2,
          success: function(res) {
            var formdata = {
              USER_ID: wx.getStorageSync("userId"),
              USER_NAME: that.data.user_info.MEMBERSHIP_NICKNAME,
              TO_USER_ID: wx.getStorageSync("userId"),
              TO_USER_NAME: that.data.user_info.MEMBERSHIP_NICKNAME,
              NUMBER: that.data.rechareItem.num,
              TYPE: 1,
              APPROACH: 4
            }
            pro_req.saveEnergy(formdata, function(res) {
              console.log("保存能量", res.data)
              wx.showModal({
                title: '充值成功',
                content: '快去收取能量吧!',
                showCancel: false,
                success: function() {
                  that.findEnergyListByType()
                }
              })
            })
          },
          fail: function(res) {

          },
          complete: function(comsFun) {
            wx.hideLoading()
            if (comsFun.errMsg != "requestPayment:ok") {
              wx.showModal({
                title: '支付失败',
                content: '请重新支付',
                showCancel: false,
                confirmColor: 'red',
                success: function(res) {},
              })
              // wx.showModal({
              //   title: '提示',
              //   content: '支付功能暂未开通,敬请期待',
              //   showCancel: false,
              //   confirmColor: 'red',
              //   success: function(res) {},
              // })
            }
          }
        })
      }
    })
  },

  /**
   * 隐藏遮罩
   */
  hideModalAuto: function() {
    var that = this
    that.setData({
      // showModalStatus: false,
      ifshowRecharge: false,
      ifshowLogin: false,
      ifshowRechargeSure: false,
    })
    maskLayer.hideModal(that)
  },


  catchMove: function() {

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
    var that = this
    that.findsilde()
    that.getHomeProduct()
    that.getVipGiftBagTop3()
    that.getCategroyAll()
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 1000)
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
    var that = this
    var userId = wx.getStorageSync("userId")
    var userType = wx.getStorageSync('userType')
    var str=''
    if (userId && userType && userType!=2){
      str = '?bossId=' + userId
    }
    // var str = userId ? '?bossId=' + userId : ''
    // var imageUrl = that.data.imgURL + wx.getStorageSync("shareImg")
    // console.log("str", imageUrl)

    return {
      path: '/pages/index/index' + str,
      // imageUrl: imageUrl,
      success: function (res) {
        wx.showToast({
          title: '分享成功！',
          success: function (res) { },
        })
      },
      fail: function (res) {
        // 转发失败
        that.setData({
          showModalStatus: false
        })
      }
    }
  },

  // 跳转到分类页面
  toProductSort:function(e){
    console.log(e)
    var catId = e.currentTarget.dataset.id
    var banner = e.currentTarget.dataset.banner
    // 全部商品
    if (catId =="1a043f3c0e6c40d88ae08e5ff13e7368"){
      wx.navigateTo({
        url: '../product/productSort/productSort',
      })
    // 美颜产品
    } else if (catId =="f6f70f8b39de44239342b95f74158105"){
      wx.navigateTo({
        url: '../product/videoList/videoList',
      })
      

    // 积分商城
    } else if (catId =="b10258690ba04387bba4f6a789af51d4"){  
      wx.navigateTo({
        url: '../product/integralShop/integralShop?catId=' + catId,
      })
    }else{
      wx.navigateTo({
        url: '../product/productList/productList?catId=' + catId,
      })
    }
  },

  // 跳转到商品详情
  toProductData:function(e){
    console.log(e)
    var proId = e.currentTarget.dataset.id
    console.log(proId)
    wx.navigateTo({
      url: '../product/productData/productData?proId=' + proId,
    })
  },

  // 显示遮罩层（优惠卷）
  showSpecification: function () {
    var that = this
    maskLayer.showModal(that)
    that.setData({
      showCoupon: true
    })
  },
  // 隐藏遮罩（优惠卷）
  hideModal: function () {
    var that = this
    that.setData({
      showCoupon: false,
    })
    maskLayer.hideModal(that)
  },

  // 前往VIP
  toVIPshop:function(){
    wx.navigateTo({
      url: '../product/productList/productList?catId=d31bff9748734aedb735f476c27fb944',
    })
  },

  // 前往充值
  toRecharge:function(){
    var that=this
    var userId = wx.getStorageSync("userId")
    if (!userId){
      wx.showToast({
        title: '请先登录',
        image: '/images/errortip.png'
      })
      return false
    }
    wx.navigateTo({
      url: '../money/recharge/recharge',
    })
  },

  // 店主权益
  toDzInterest:function(){
    var that=this
    wx.navigateTo({
      url: '../system/dzInterest/dzInterest',
    })
  },

  // 查询消息
  findMessage:function(){
    var that=this
    baseReq.findMessage({},function(res){
      console.log('消息',res)
      that.setData({
        messageList:res.data.list
      })
    })
  },

  // VIP商品详情
  toProductVIPData:function(e){
    var proId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../product/productVIPData/productVIPData?proId=' + proId,
    })
  }

})