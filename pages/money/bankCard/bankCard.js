// pages/money/bankCard/bankCard.js
const baseReq = require("../../../utils/baseReq.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
    that.findbank()
  },
  // 查看我的银行卡信息
  findbank: function () {
    var that=this
    var formdata={
      openid: wx.getStorageSync("wxOPENID")
    }
    baseReq.findBankcardByOpenid(formdata, function (result) {
      console.log("银行卡信息", result)
      that.setData({
        bankList:result.data.list
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
  // 查询所有的银行卡


  // 添加银行卡
  addBankCard:function(e){
    var that = this
    var formdata = e.detail.value
    formdata.openid = wx.getStorageSync("wxOPENID")
    formdata.userId = wx.getStorageSync("userId")
    if (!formdata.name) {
      wx.showToast({
        title: '姓名为空',
        image: '/images/errortip.png'
      })
      return false
    }  
    if (!formdata.bankName) {
      wx.showToast({
        title: '开户行为空',
        image: '/images/errortip.png'
      })
      
    }
    if (!formdata.bankCard) {
      wx.showToast({
        title: '银行卡号为空',
        image: '/images/errortip.png'
      })
      return false
    } 
    wx.showLoading({
      title: '提交中...',
    })
    baseReq.saveUserBankcard(formdata, function (res) {
      console.log(res)
      wx.hideLoading()
      if (res.data.returnCode == 1) {
        that.hideModal1()
        wx.showToast({
          title: '提交成功',
          image: '/images/righttip.png'
        })
      } else {
        wx.showToast({
          title: '提交失败',
          image: '/images/errortip.png'
        })
      }
      that.onShow()
    })
    
  },

  // 点击选择默认的银行卡
  editUserBankcardIsDefault:function(e){
    console.log(e)
    var that= this
    var id = e.currentTarget.dataset.id
    var formdata={
      id: id,
      openid: wx.getStorageSync("wxOPENID")
    }
 
    baseReq.editUserBankcardIsDefault(formdata,function(result){
      console.log("默认",result)
      if (result.data.returnCode == 1) {
        that.onShow()
      } else {
        wx.showToast({
          title: '已默认',
        })
      }
    })
  },

  // editbank 修改银行卡信息
  editUserBankcard:function(e){
    var that = this
    var formdata = e.detail.value
    formdata.openid = wx.getStorageSync("wxOPENID")
    formdata.userId = wx.getStorageSync("userId")
    formdata.id = that.data.bankItem.id
    if (!formdata.name) {
      wx.showToast({
        title: '姓名为空',
        image: '/images/errortip.png'
      })
    } else if (!formdata.bankName) {
      wx.showToast({
        title: '开户行为空',
        image: '/images/errortip.png'
      })
    } else if (!formdata.bankCard) {
      wx.showToast({
        title: '银行卡号为空',
        image: '/images/errortip.png'
      })
    } else {
      wx.showLoading({
        title: '修改中...',
      })
      baseReq.editUserBankcard(formdata, function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.returnCode == 1) {
          that.hideModal1()
          wx.showToast({
            title: '修改成功',
            image: '/images/righttip.png'
          })
        } else {
          wx.showToast({
            title: '修改失败',
            image: '/images/errortip.png'
          })
        }
        that.onShow()
      })
    }
  },

  deleteUserBankcard:function(e){
    var that = this
    var id = e.target.dataset.id
    wx.showModal({
      title: '删除提示',
      content: '确定删除吗？',
      success:function(res){
        if(res.confirm){
          wx.showLoading({
            title: '删除中...',
          })
          var formdata={
            id: id,
            openid: wx.getStorageSync("wxOPENID")
          }
          baseReq.deleteUserBankcard(formdata, function (result) {
            console.log("删除", result)
            wx.hideLoading()
            if (result.data.returnCode == 1) {
              wx.showToast({
                title: '删除成功',
                image: '/images/righttip.png'
              })
              that.onShow()
            } else {
              wx.showToast({
                title: '删除失败',
                image: '/images/errortip.png'
              })
            }
          })
        }
      }
    })

  },

  // 模态框展示
  moneyBackModal: function (e) {
    var that = this
    console.log(e)
    var type = e.target.dataset.type
    var index = e.target.dataset.index
    // that.setData({
    //   closeorderId: e.target.dataset.id
    // })
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()

    if (type=="add"){
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
    }else{
      this.setData({
        animationData: animation.export(),
        showModalStatus1: true,
        bankItem: that.data.bankList[index]
      })
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  // 隐藏模态框
  hideModal1: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        showModalStatus1:false
      })
    }.bind(this), 200)
  },

})