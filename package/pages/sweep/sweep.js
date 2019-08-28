// pages/game/game.js
var maskLayer = require('../../../utils/xmls/maskLayer/maskLayer.js'); //遮罩
var util = require("../../../utils/util.js")
var pro_req = require("../../../utils/product.js")
const loginReq = require("../../../utils/loginReq.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    gamelogs: [1, 1, 1],
    creatBoxStatus: false,
    ruleBoxStatus: false,
    openBoxStatus: false,
    coinsNum: [
      10, 30, 50, 100, 200, 300, 500, 800, 1000
    ],
    ssaNum: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    ],
    landMineList: "",
    page: 2,
    money: "",
    choosessaNum: "",
    houseList: [],
    isend: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

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
    // this.login()
    var that = this
    var online = Math.floor(Math.random() * 20) + 30
    that.setData({
      online: online
    })
    that.hideModal()
    that.checkUserInfo()
    that.getLandMineListFrom()
  },



  checkUserInfo: function() {
    var that = this
    var formdata = {
      openid: wx.getStorageSync("wxOPENID"),
      userId: wx.getStorageSync("userId"),
    }
    loginReq.checkUserInfo(formdata, function(res) {
      console.log('checkuserinfo', res)
      that.setData({
        userInfo: res.data.obj
      })
    })
  },


  tiaofuTouch: function() {

  },





  // 已经点开的红包查看详情
  tolookDetail: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../sweepDetail/sweepDetail?id=' + id,
    })
  },

  // 获取雷包列表大厅按照页数
  getLandMineListFrom: function() {
    var that = this
    var page = 1
    wx.showLoading({
      title: 'loading',
      mask: true
    })
    var formdata = {
      page: 1,
      rows: 10,
      userId: wx.getStorageSync("userId"),
      type: 0
    }
    pro_req.getLandMineList(formdata, function(res) {
      console.log("雷包列表大厅", res)
      wx.hideLoading()
      that.setData({
        landMineList: res.data.list
      })
    })
  },
  // 参与游戏
  toSweepDetail: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var landMineList = that.data.landMineList
    var openmine = landMineList[index]
    var openid = wx.getStorageSync("wxOPENID")
    if (openid) {
      maskLayer.showModal(that)
      that.setData({
        openBoxStatus: true,
        openmine: openmine
      })
    } else {
      wx.showToast({
        title: '请先登录!',
      })
    }
  },
  // 打开红包
  openredpacket: function(e) {
    var that = this
    var userId = wx.getStorageSync("userId")
    var landmine_id = that.data.openmine.id
    if (that.data.isopening) {
      return false
    }
    that.setData({
      isopening: true
    })
    var formdata = {
      landMineId: landmine_id,
      userId: userId
    }
    pro_req.grabRedPacket(formdata, function(res) {
      console.log("这里是打开红包", res)
      that.setData({
        isopening: false
      })
      if (res.data.returnCode == "4") {
        wx.showModal({
          title: '提示',
          content: '积分不足',
          showCancel: false,
          success: function(res) {
            that.hideModal()
            that.onShow()
          }
        })
      } else if (res.data.returnCode == "5") {
        wx.showModal({
          title: '提示',
          content: '此红包已被抢完',
          showCancel: false,
          success: function() {
            that.hideModal()
            that.onShow()
          }
        })

      } else if (res.data.returnCode == "2") {
        wx.showModal({
          title: '提示',
          content: '此红包已抢过',
          showCancel: false,
          success: function() {
            that.hideModal()
            that.onShow()
          }
        })
      } else if (res.data.returnCode == "1") {
        wx.navigateTo({
          url: '../sweepDetail/sweepDetail?id=' + landmine_id,
        })
      } else {
        that.hideModal()
        wx.showToast({
          title: '请重试',
          image: "/images/errortip.png"
        })
      }
    })
  },
  // 选择金钱
  chooseMoney: function(e) {
    var that = this
    var money = e.currentTarget.dataset.money
    that.setData({
      money: money,
    })
  },
  // 选择尾数
  chooseSsaNum: function(e) {
    var that = this
    var num = e.currentTarget.dataset.money
    that.setData({
      choosessaNum: num,
    })
  },
  // 创建雷包
  creatpacket: function(e) {
    var that = this
    var coin = that.data.money
    var landmine_num = that.data.choosessaNum
    if (landmine_num === "" || coin === "") {
      wx.showToast({
        title: '请选择积分/尾数',
      })
      return false
    }
    var userId = wx.getStorageSync("userId")
    if (userId) {
      var formdata = {
        coin: coin,
        landmineNum: landmine_num,
        userId: wx.getStorageSync("userId"),
        userName: that.data.userInfo.wxName,
        openid: that.data.userInfo.openid,
        userPic: that.data.userInfo.wxPic
      }
      wx.showLoading({
        title: '创建中...',
        mask: true
      })
      pro_req.createLandMine(formdata, function(res) {
        console.log("这里是创建雷包", res)
        wx.hideLoading()
        if (res.data.returnCode == "3") {
          wx.showModal({
            title: '提示',
            content: '积分不足',
            showCancel: false,
            success: function(res) {
              that.hideModal()
              that.onShow()
            }
          })
        } else if (res.data.returnCode == "1") {
          wx.showModal({
            title: '提示',
            content: '成功创建雷包!',
            showCancel: false,
            success: function(res) {
              that.hideModal()
              that.onShow()
            }
          })
        } else {
          wx.showToast({
            title: '请重试',
            image: "/images/errortip.png"
          })
        }

      })
    } else {
      wx.showToast({
        title: '请先登录',
      })
      that.hideModal()
    }
  },
  // 显示创建雷包弹出框
  showCreatBox: function() {
    var that = this

    var openid = wx.getStorageSync("wxOPENID")
    if (openid) {
      maskLayer.showModal(that)
      that.setData({
        creatBoxStatus: true
      })
    } else {
      wx.showToast({
        title: '请先登录!',
      })
    }
  },
  // 显示游戏规则弹出框
  showRuleBox: function() {
    var that = this
    maskLayer.showModal(that)
    that.setData({
      ruleBoxStatus: true
    })
  },
  /**
   * 隐藏遮罩
   */
  hideModal: function() {
    var that = this
    that.setData({
      creatBoxStatus: false,
      ruleBoxStatus: false,
      openBoxStatus: false
    })
    maskLayer.hideModal(that)
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
    wx.showLoading({
      title: '正在刷新..',
      mask: true
    })
    var formdata = {
      page: 1,
      rows: 10,
      userId: wx.getStorageSync("userId"),
      type: 0
    }
    pro_req.getLandMineList(formdata, function(res) {
      console.log("雷包列表大厅", res)
      wx.hideLoading()
      wx.stopPullDownRefresh()
      that.setData({
        landMineList: res.data.list,
        page: 2,
        isend: 0
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    if (that.data.isend == 1) {
      return false
    }
    wx.showLoading({
      title: 'loading',
      mask: true
    })
    var data = that.data.landMineList
    var formdata = {
      page: that.data.page,
      rows: 10,
      userId: wx.getStorageSync("userId"),
      type: 0
    }

    pro_req.getLandMineList(formdata, function(res) {
      console.log("雷包列表大厅", res)
      wx.hideLoading()
      var arr = res.data.list
      var data2 = data.concat(arr)
      that.setData({
        landMineList: data2,
        page: that.data.page + 1
      })
      if (arr.length < 10) {
        that.setData({
          isend: 1
        })
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  // 创建纪录
  toCreateRecord: function() {
    wx.navigateTo({
      url: '../createRecord/createRecord',
    })
  },
})